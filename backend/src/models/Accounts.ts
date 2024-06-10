import { Schema, model } from "mongoose";
const AccountTable = new Schema({
	title: String,
	userId: String,
	createdAt: Date
});
export default model("Accounts", AccountTable);
