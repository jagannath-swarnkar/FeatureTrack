import { Schema, model } from "mongoose";
const CategoryTable = new Schema({
	title: String,
	userId: String,
	createdAt: Date
});
export default model("Categories", CategoryTable);
