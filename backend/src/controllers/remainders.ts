import Joi from "joi";
import Remainders from "../models/Remainders";
import { IExpense, IRemainderPayload } from "../utils/types";
import Expense from "../models/Expense";

export const addNewRemainder = async (_req: any, _res: any) => {
	let payload: IRemainderPayload;
	const schema = Joi.object({
		title: Joi.string().optional(),
		amount: Joi.number().required(),
		category: Joi.string().required(),
		account: Joi.string().required(),
		status: Joi.string()
			.allow(...["active", "inactive"])
			.required(),
		lastDate: Joi.string().required(),
		billingDate: Joi.string().optional().allow("", null),
		billingCycle: Joi.string()
			.allow(...["monthly", "yearly"])
			.required()
	});
	try {
		payload = await schema.validateAsync(_req.body);
	} catch (error) {
		return _res.status(400).json({ message: error.message });
	}
	try {
		payload.userId = _req.tokenData.email;
		const res = await Remainders.create(payload);
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
export const getAllRemainders = async (_req: any, _res: any) => {
	try {
		const expenses = await Remainders.find({ userId: _req.tokenData.email }, { __v: 0 }).sort({ status: 1, lastDate: 1 });
		return _res.status(200).json(expenses);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const deleteRemainder = async (_req: any, _res: any) => {
	const { id } = _req.params;
	if (!id) {
		return _res.status(400).json({ message: "id is required!" });
	}
	try {
		const deleted = await Remainders.findByIdAndDelete({ _id: id, userId: _req.tokenData.email });
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

export const updateOneRemainder = async (_req: any, _res: any) => {
	const { id } = _req.params;
	let payload: IRemainderPayload;
	const schema = Joi.object({
		title: Joi.string().optional(),
		amount: Joi.number().required(),
		category: Joi.string().required(),
		account: Joi.string().required(),
		status: Joi.string()
			.allow(...["active", "inactive"])
			.required(),
		lastDate: Joi.string().required(),
		billingDate: Joi.string().optional(),
		billingCycle: Joi.string()
			.allow(...["monthly", "yearly"])
			.required(),
		addExpense: Joi.boolean().optional()
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
		if (payload.addExpense) {
			const expensePayload: IExpense = {
				title: payload.title,
				category: payload.category,
				expenseDate: new Date(payload.billingDate),
				amount: payload.amount,
				account: payload.account,
				finalAmount: 0,
				note: `Auto generated expense for ${payload.title} via remainder.`,
				userId: _req.tokenData.email
			};
			// update final amount
			await Expense.create(expensePayload);
		}
		delete payload.addExpense;
		payload.userId = _req.tokenData.email;
		const updated = await Remainders.findByIdAndUpdate({ _id: id, userId: _req.tokenData.email }, payload, { new: true });
		return _res.status(200).json(updated);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};
