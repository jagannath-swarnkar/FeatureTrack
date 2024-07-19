import Joi from "joi";

import { IRequest, IResponse } from "../utils/types";
import Components from "../models/Components";

export const addNewComponent = async (_req: IRequest, _res: IResponse) => {
	let payload: any;

	const schema = Joi.object({
		title: Joi.string().required(),
		subtitle: Joi.string().required(),
		moduleId: Joi.string().optional(),
		moduleName: Joi.string().optional(),
		pageId: Joi.string().optional(),
		pageName: Joi.string().optional(),
		level: Joi.number().required().allow(1, 2, 3)
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
	payload.comments = [];
	try {
		const res = await Components.create(payload);
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
export const getAllComponents = async (_req: IRequest, _res: IResponse) => {
	try {
		const payload: any = {
			projectId: _req.headers.projectid,
			level: 1
		};
		if (_req.query.level == "3") {
			(payload.pageId = _req.query.pid), (payload.level = 3);
		} else if (_req.query.level == "2") {
			(payload.moduleId = _req.query.mid), (payload.level = 2);
		}
		const expenses = await Components.find(payload, { __v: 0 });
		return _res.status(200).json(expenses);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const deleteComponent = async (_req: IRequest, _res: IResponse) => {
	const { id } = _req.params;
	if (!id) {
		return _res.status(400).json({ message: "id is required!" });
	}
	try {
		const deleted = await Components.findByIdAndDelete({ _id: id });
		if (!deleted) {
			return _res.status(400).json({
				code: 400,
				message: "Invalid id!"
			});
		}
		return _res.status(200).json({
			message: "Success!",
			status: 200,
			data: deleteComponent
		});
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const updateOneComponent = async (_req: IRequest, _res: IResponse) => {
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
		const updated = await Components.findByIdAndUpdate({ _id: id }, payload, { new: true });
		return _res.status(200).json(updated);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const getComponentDetails = async (_req: IRequest, _res: IResponse) => {
	try {
		const { id } = _req.params;
		const expenses = await Components.findOne({ projectId: _req.headers.projectid, _id: id }, { __v: 0 });
		return _res.status(200).json(expenses);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};
