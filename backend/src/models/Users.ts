import { Schema, model } from "mongoose";
const UserTable = new Schema({
	email: String,
	password: String,
	name: String,
	profilePic: String,
	banner: String,
	createdAt: Date,
	status: String,
	emailVerified: Boolean,
	otp: String,
	otpExpires: Date,
	projects: Array
});
export default model("Users", UserTable);
