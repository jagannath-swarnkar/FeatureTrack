import jwt from "jsonwebtoken";
import Users from "../models/Users";
import { IRequest, IResponse } from "./types";

export const AuthGuard = async (req: IRequest, res: IResponse, next: any) => {
	try {
		let token = "";
		if (!req.headers.authorization) {
			return res.status(401).send({
				message: "Token not found!",
				status: 401
			});
		}
		if (req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		} else {
			token = req.headers.authorization;
		}
		const decoded: any = await jwt.verify(token, process.env.SECRETE_KEY);
		const dbResult: any = await Users.findOne({ _id: decoded.userId });

		if (!dbResult || !dbResult?._id) {
			return res.status(401).json({
				message: "Unauthorized!",
				status: 401,
				error: "Invalid token"
			});
		}

		if (!req.headers.projectid || !req.headers.projectname) {
			return res.status(400).send({
				message: "Project details are missing on headers (projectid: string, projectname: string)",
				code: 400
			});
		}
		req.tokenData = dbResult;
		next();
	} catch (error) {
		console.log("error", error);
		return res.status(401).json({
			message: "Unauthorized!",
			status: 401,
			error: "Invalid token"
		});
	}
};
