import { Schema, model } from "mongoose";
const ModuleTable = new Schema({
	title: String,
	subtitle: String,
	createdAt: Date,
	createdBy: String,
	updatedAt: Date,
	updatedBy: String,
	projectId: String,
	projectName: String
});
export default model("Modules", ModuleTable);
