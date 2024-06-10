import { Schema, model } from "mongoose";
const RemaindersTable = new Schema({
	title: String,
	amount: Number,
	category: String,
	account: String,
	status: String,
	lastDate: String,
	billingDate: String,
	billingCycle: String,
	accountType: String,
	userId: String
});
export default model("Remainders", RemaindersTable);
