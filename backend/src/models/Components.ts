import { Schema, model } from "mongoose";
const ComponentTable = new Schema({
	title: String,
	subtitle: String,
	createdAt: Date,
	createdBy: String,
	updatedAt: Date,
	updatedBy: String,
	projectId: String,
	projectName: String,
	moduleId: String,
	moduleName: String,
	pageId: String,
	pageName: String,
	level: Number,
	comments: Array
});
export default model("Components", ComponentTable);
