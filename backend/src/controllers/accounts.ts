import Joi from "joi";
import Accounts from "../models/Accounts";

export const addNewAccount = async (_req: any, _res: any) => {
	let payload: any;
	const schema = Joi.object({
		title: Joi.string().optional()
	});
	try {
		payload = await schema.validateAsync(_req.body);
	} catch (error) {
		return _res.status(400).json({ message: error.message });
	}
	payload.createdAt = new Date();
	payload.userId = _req.tokenData.email;
	try {
		const res = await Accounts.create(payload);
		return _res.status(201).json(res);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

// get all expenses filtered by start date and end date
export const getAllAccounts = async (_req: any, _res: any) => {
	try {
		const expenses = await Accounts.find({ userId: _req.tokenData.email }, { __v: 0 });
		return _res.status(200).json(expenses);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const deleteAccount = async (_req: any, _res: any) => {
	const { id } = _req.params;
	if (!id) {
		return _res.status(400).json({ message: "id is required!" });
	}
	try {
		const deleted = await Accounts.findByIdAndDelete({ _id: id, userId: _req.tokenData.email });
		if (!deleted) {
			return _res.status(400).json({
				code: 400,
				message: "Invalid id!"
			});
		}
		return _res.status(200).json(deleted);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const updateOneAccount = async (_req: any, _res: any) => {
	const { id } = _req.params;
	let payload: any;
	const schema = Joi.object({
		title: Joi.string().optional()
	});
	try {
		payload = await schema.validateAsync(_req.body);
	} catch (error) {
		return _res.status(400).json({ message: error.message });
	}
	if (!id) {
		return _res.status(400).json({ message: "id is required!" });
	}
	try {
		const updated = await Accounts.findByIdAndUpdate({ _id: id, userId: _req.tokenData.email }, payload, { new: true });
		return _res.status(200).json(updated);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};
