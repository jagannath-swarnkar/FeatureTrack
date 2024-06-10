import Joi from "joi";
import ExpenseModel from "../models/Expense";
import { IExpense } from "../utils/types";

export const addNewExpense = async (_req: any, _res: any) => {
	let payload: IExpense;
	const schema = Joi.object({
		title: Joi.string().required(),
		category: Joi.string().required(),
		expenseDate: Joi.string().required(),
		amount: Joi.number().required(),
		account: Joi.string().required(),
		note: Joi.string().optional().allow("", null)
	});
	try {
		payload = await schema.validateAsync(_req.body);
	} catch (error) {
		return _res.status(400).json({ message: error.message });
	}
	payload.createdAt = new Date();
	payload.expenseDate = new Date(payload.expenseDate);
	payload.userId = _req.tokenData.email;
	try {
		// adding log to expense table
		const newExpense = await ExpenseModel.create(payload);
		return _res.status(201).json(newExpense);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};
enum SortType {
	asc = 1,
	desc = -1
}

// get all expenses filtered by start date and end date
export const getAllExpenses = async (_req: any, _res: any) => {
	const { startDate, endDate, category, account, paymentMode, sortBy, sortType, search } = _req.query;
	if (!startDate || !endDate) {
		return _res.status(400).json({ message: "startDate and endDate are required!" });
	}
	try {
		const payload: any = { userId: _req.tokenData.email, expenseDate: { $gte: new Date(startDate), $lte: new Date(endDate) } };
		let sort: any = { expenseDate: SortType[sortType] || -1 };
		if (sortBy === "amount") sort = { amount: SortType[sortType] };
		if (sortBy === "createdAt") sort = { createdAt: SortType[sortType] };

		if (category) {
			let cat = category.split(",");
			payload["category"] = { $in: cat };
		}
		if (account) {
			let acc = account.split(",");
			payload["account"] = { $in: acc };
		}
		if (paymentMode) {
			let pm = paymentMode.split(",");
			payload["paymentMode"] = { $in: pm };
		}
		if (search) {
			payload["title"] = { $regex: search, $options: "i" };
		}

		const expenses = await ExpenseModel.find(payload, { __v: 0 }).sort(sort);
		return _res.status(200).json(expenses);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const updateOneExpense = async (_req: any, _res: any) => {
	const { id } = _req.params;
	let payload: IExpense;
	const schema = Joi.object({
		title: Joi.string().required(),
		category: Joi.string().required(),
		expenseDate: Joi.string().required(),
		amount: Joi.number().required(),
		account: Joi.string().required(),
		note: Joi.string().optional().allow("", null)
	});
	try {
		payload = await schema.validateAsync(_req.body);
	} catch (error) {
		return _res.status(400).json({ message: error.message });
	}
	if (payload.expenseDate) payload.expenseDate = new Date(payload.expenseDate);
	payload.userId = _req.tokenData.email;
	try {
		const updatedExpense = await ExpenseModel.findByIdAndUpdate({ _id: id, userId: _req.tokenData.email }, payload, { new: true });
		return _res.status(200).json(updatedExpense);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

export const deleteOneExpense = async (_req: any, _res: any) => {
	const { id } = _req.params;
	if (!id) {
		return _res.status(400).json({ message: "id is required!" });
	}
	try {
		const deleted = await ExpenseModel.findByIdAndDelete({ _id: id, userId: _req.tokenData.email });
		return _res.status(200).json(deleted);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
};

/**
 * This will returns the total amount of spendings by date range excluding "lend" category.
 */
export const getTotalSpendAmount = async (_req: any, _res: any) => {
	const { startDate, endDate } = _req.query;
	if (!startDate || !endDate) {
		return _res.status(400).json({ message: "startDate and endDate are required!" });
	}
	try {
		const totalSpendsRes: any = await ExpenseModel.aggregate([
			{
				$match: {
					category: { $ne: "lend" },
					expenseDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
				}
			},
			{
				$group: {
					_id: null,
					total: { $sum: "$amount" }
				}
			}
		]);
		const result = {
			totalAmount: totalSpendsRes[0].total || 0
		};
		return _res.status(200).json(result);
	} catch (error) {
		console.error("getTotalSpendAmount error: ", error);
		return _res.status(500).json({ message: error.message });
	}
};
