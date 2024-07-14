import { Schema, model } from "mongoose";
const CommentTable = new Schema({
	comment: String,
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
	componentId: String,
	componentName: String
});
// Create a compound index on categoryId, subCategoryId, and recordId
CommentTable.index({ componentId: 1, pageId: 1, moduleId: 1, projectId: 1 });
export default model("Comments", CommentTable);
