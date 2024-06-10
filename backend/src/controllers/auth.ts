import Joi from "joi";
import Users from "../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IMail } from "../utils/types";
import { getOtpEmailTemplate } from "../utils/otpEmailTemplate";
import { APP_NAME } from "../utils/config";
import { sendEmail } from "../utils/sendgrid";

export const login = async (_req: any, _res: any) => {
	let payload: any;
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});

	var validSchema = schema.validate(_req.body);

	// validating payload
	if (validSchema.error) {
		return _res.status(400).json({
			message: validSchema.error.message || "Bad Request",
			code: 400
		});
	} else {
		payload = validSchema.value;
	}

	try {
		// validating user
		let user = await Users.findOne({ email: payload.email, emailVerified: true, status: "active" });
		if (!user) {
			return _res.status(400).send({
				message: "Invalid email or password!",
				code: 400
			});
		}
		if (user.status !== "active")
			return _res.status(400).send({
				message: "User is inactive, Please contact with admin.",
				code: 400
			});

		// validating password
		const plainPass = await bcrypt.compare(payload.password, user.password);
		if (!plainPass) {
			return _res.status(400).send({
				message: "Invalid email or password!",
				code: 400
			});
		}

		// generating jwt token;
		const tokenPayload: any = {
			email: user.email,
			userId: user._id
		};
		const token = jwt.sign(tokenPayload, process.env.SECRETE_KEY, { expiresIn: 60 * 60 * 24 });
		const response = {
			token,
			email: user.email,
			userId: user._id
		};
		return _res.status(200).send({
			message: "Login successfull!",
			data: response,
			status: 200
		});
	} catch (error) {
		console.log("error in creating token", error);
		return _res.status(500).json({
			message: "Internal Server Error",
			status: 500
		});
	}
};

export const signup = async (_req: any, _res: any) => {
	let payload: any;
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		name: Joi.string().required(),
		profilePic: Joi.string().optional().allow(""),
		banner: Joi.string().optional().allow("")
	});

	var validSchema = schema.validate(_req.body);

	// validating payload
	if (validSchema.error) {
		return _res.status(400).json({
			message: validSchema.error.message || "Bad Request",
			code: 400
		});
	} else {
		payload = validSchema.value;
	}

	try {
		// validating user
		let user = await Users.findOne({ email: payload.email });
		if (user) {
			return _res.status(400).send({
				message: "User already exists!",
				code: 400
			});
		}

		// hashing password
		const hashedPassword = await bcrypt.hash(payload.password, 10);
		payload.password = hashedPassword;

		payload.createdAt = new Date();
		payload.status = "inactive";
		payload.emailVerified = false;
		payload.otp = Math.floor(100000 + Math.random() * 900000);
		payload.otpExpires = new Date(new Date().getTime() + 5 * 60000);
		// send otp here
		const emailPayload: any = {
			to: [payload.email],
			subject: "Verify Your Account on FMT - One-Time Password (OTP) Inside",
			html: getOtpEmailTemplate(payload.otp, APP_NAME)
		};
		// console.log('emailPayload', emailPayload)
		const res = await sendEmail(emailPayload);
		console.log("res", res);

		// creating user
		let newUser = new Users(payload);
		await newUser.save();
		return _res.status(201).send({
			message: "User created and an OTP send for verification!",
			status: 201
		});
	} catch (error) {
		return _res.status(500).json({
			message: "Internal Server Error",
			status: 500
		});
	}
};

export const resendOtp = async (_req: any, _res: any) => {
	let payload: any;
	const schema = Joi.object({
		email: Joi.string().email().required()
	});

	var validSchema = schema.validate(_req.body);

	// validating payload
	if (validSchema.error) {
		return _res.status(400).json({
			message: validSchema.error.message || "Bad Request",
			code: 400
		});
	} else {
		payload = validSchema.value;
	}

	try {
		// validating user
		let user = await Users.findOne({ email: payload.email });
		if (!user) {
			return _res.status(400).send({
				message: "User does not exists!",
				code: 400
			});
		}

		payload.otp = Math.floor(100000 + Math.random() * 900000);
		payload.otpExpires = new Date(new Date().getTime() + 5 * 60000);
		// updating user
		await Users.updateOne({ email: payload.email }, { $set: { otp: payload.otp, otpExpires: payload.otpExpires } });

		// send otp here
		const emailPayload: any = {
			to: [payload.email],
			subject: "Verify Your Account on FMT - One-Time Password (OTP) Inside",
			html: getOtpEmailTemplate(payload.otp, APP_NAME)
		};
		const res = await sendEmail(emailPayload);

		return _res.status(200).send({
			message: "OTP send successfully!",
			status: 200
		});
	} catch (error) {
		return _res.status(500).json({
			message: "Internal Server Error",
			status: 500
		});
	}
};

export const verifyOtp = async (_req: any, _res: any) => {
	let payload: any;
	const schema = Joi.object({
		email: Joi.string().email().required(),
		otp: Joi.number().required()
	});

	var validSchema = schema.validate(_req.body);

	// validating payload
	if (validSchema.error) {
		return _res.status(400).json({
			message: validSchema.error.message || "Bad Request",
			code: 400
		});
	} else {
		payload = validSchema.value;
	}

	try {
		// validating user
		let user = await Users.findOne({ email: payload.email, otp: payload.otp, otpExpires: { $gt: new Date() } });
		if (!user) {
			return _res.status(400).send({
				message: "Invalid OTP or OTP expired!",
				code: 400
			});
		}

		// updating user
		await Users.updateOne({ email: payload.email }, { $set: { status: "active", emailVerified: true, otp: null, otpExpires: null } });
		return _res.status(200).send({
			message: "User verified successfully!",
			status: 200
		});
	} catch (error) {
		return _res.status(500).json({
			message: "Internal Server Error",
			status: 500
		});
	}
};

export const sendMarketingEmail = async (_req: any, _res: any) => {
	const email = _req.query.email;
	if (!email)
		return _res.status(400).send({
			message: "Email is required in query param!",
			code: 400
		});

	const emailPayload: any = {
		to: [email],
		subject: "Nodemailer Email Testing",
		// text: "Send free email using Nodemailer in javascript/nodejs | by Jagannath Swarnkar | Feb, 2024 | Medium"
		html: `
            <div>
             <h1>Send free email using Nodemailer in javascript/nodejs | by Jagannath Swarnkar | Feb, 2024 | Medium </h1>
             <a href="https://jagannath18.medium.com/send-free-email-using-nodemailer-in-javascript-nodejs-39e29e8922f6">View Documentation</a>
            </div>
          `
	};
	try {
		const res = await sendEmail(emailPayload);
		return _res.status(200).send({
			message: "Email sent successfully!",
			status: 200
		});
	} catch (error) {
		console.log("error", error);
		return _res.status(500).json({
			message: "Internal Server Error",
			error: error,
			status: 500
		});
	}
};
