import { Schema, model } from "mongoose";
const CreditTable = new Schema({
	title: { type: String, index: true },
	category: String,
	creditDate: Date,
	amount: Number,
	account: String,
	createdAt: Date,
	finalAmount: Number,
	note: String
});
CreditTable.index({ name: "text" }); // Text index on the name field
CreditTable.index({ creditDate: 1 });
export default model("Credits", CreditTable);
