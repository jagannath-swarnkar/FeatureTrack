import { Schema, model } from "mongoose";
const ExpenseTable = new Schema({
	title: { type: String, index: true },
	category: String,
	expenseDate: Date,
	amount: Number,
	account: String,
	paymentMode: String,
	createdAt: Date,
	finalAmount: Number,
	note: String,
	userId: String
});
ExpenseTable.index({ name: "text" }); // Text index on the name field
ExpenseTable.index({ expenseDate: 1 });
export default model("Expense", ExpenseTable);
