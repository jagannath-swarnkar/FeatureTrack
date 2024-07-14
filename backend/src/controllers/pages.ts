import Joi from "joi";
import Pages from "../models/Pages";

import { IRequest, IResponse } from "../utils/types";

export const addNewPage = async (_req: IRequest, _res: IResponse) => {
	let payload: any;

	const schema = Joi.object({
		title: Joi.string().required(),
		subtitle: Joi.string().required(),
		moduleId: Joi.string().required(),
		moduleName: Joi.string().required()
	});
	try {
		payload = await schema.validateAsync(_req.body);
	} catch (error) {
		return _res.status(400).json({ message: error.message });
	}
	payload.createdAt = new Date();
	payload.createdBy = _req.tokenData.email;
	payload.projectId = _req.headers.projectid;
	payload.projectName = _req.headers.projectname;

	try {
		const res = await Pages.create(payload);
		return _res.status(201).json({
			message: "Success",
			status: 201,
			data: res
		});
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

// get all expenses filtered by start date and end date
export const getAllPages = async (_req: IRequest, _res: IResponse) => {
	try {
		const moduleId = _req.query.mid;
		const expenses = await Pages.find({ projectId: _req.headers.projectid, moduleId: moduleId }, { __v: 0 });
		return _res.status(200).json(expenses);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const deletePage = async (_req: IRequest, _res: IResponse) => {
	const { id } = _req.params;
	if (!id) {
		return _res.status(400).json({ message: "id is required!" });
	}
	try {
		const deleted = await Pages.findByIdAndDelete({ _id: id });
		if (!deleted) {
			return _res.status(400).json({
				code: 400,
				message: "Invalid id!"
			});
		}
		return _res.status(200).json({
			message: "Success!",
			status: 200,
			data: deletePage
		});
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const updateOnePage = async (_req: IRequest, _res: IResponse) => {
	const { id } = _req.params;
	let payload: any;
	const schema = Joi.object({
		title: Joi.string().required(),
		subtitle: Joi.string().required()
	});
	try {
		payload = await schema.validateAsync(_req.body);
	} catch (error) {
		return _res.status(400).json({ message: error.message });
	}
	if (!id) {
		return _res.status(400).json({ message: "id is required!" });
	}
	payload.updatedAt = new Date();
	payload.updatedBy = _req.tokenData.email;
	try {
		const updated = await Pages.findByIdAndUpdate({ _id: id }, payload, { new: true });
		return _res.status(200).json(updated);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};
