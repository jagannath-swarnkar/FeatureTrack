import { Schema, model } from "mongoose";
const PagesTable = new Schema({
	title: String,
	subtitle: String,
	createdAt: Date,
	createdBy: String,
	updatedAt: Date,
	updatedBy: String,
	projectId: String,
	projectName: String,
	moduleId: String,
	moduleName: String
});
export default model("Pages", PagesTable);
