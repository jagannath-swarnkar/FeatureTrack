import Joi from "joi";
import Comments from "../models/Components";

import { IRequest, IResponse } from "../utils/types";

export const addNewComment = async (_req: IRequest, _res: IResponse) => {
	let payload: any;

	const schema = Joi.object({
		comment: Joi.string().required(),
		componentId: Joi.string().required(),
		componentName: Joi.string().required(),
		moduleId: Joi.string().optional(),
		moduleName: Joi.string().optional(),
		pageId: Joi.string().optional(),
		pageName: Joi.string().optional()
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
		const res = await Comments.create(payload);
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
export const getAllComments = async (_req: IRequest, _res: IResponse) => {
	try {
		const query: any = {
			projectId: _req.headers.projectid,
			componentId: _req.query.cid
		};
		if (_req.query.mid) {
			query.moduleId = _req.query.mid;
		}
		if (_req.query.pid) {
			query.pageId = _req.query.pid;
		}
		if (_req.query.cid) {
			query.componentId = _req.query.cid;
		}
		const expenses = await Comments.find(query, { __v: 0 });
		return _res.status(200).json(expenses);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const deleteComment = async (_req: IRequest, _res: IResponse) => {
	const { id } = _req.params;
	if (!id) {
		return _res.status(400).json({ message: "id is required!" });
	}
	try {
		const deleted = await Comments.findByIdAndDelete({ _id: id });
		if (!deleted) {
			return _res.status(400).json({
				code: 400,
				message: "Invalid id!"
			});
		}
		return _res.status(200).json({
			message: "Success!",
			status: 200,
			data: deleteComment
		});
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const updateOneComment = async (_req: IRequest, _res: IResponse) => {
	const { id } = _req.params;
	let payload: any;
	const schema = Joi.object({
		comment: Joi.string().required(),
		componentId: Joi.string().required(),
		pageId: Joi.string().optional(),
		moduleId: Joi.string().optional()
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
	const query: any = {
		_id: id,
		projectId: _req.headers.projectid,
		componentId: _req.query.cid
	};
	if (_req.query.mid) {
		query.moduleId = _req.query.mid;
	}
	if (_req.query.pid) {
		query.pageId = _req.query.pid;
	}
	try {
		const updated = await Comments.findByIdAndUpdate(query, payload, { new: true });
		return _res.status(200).json(updated);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};
