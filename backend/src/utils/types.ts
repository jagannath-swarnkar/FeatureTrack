import { Request, Response } from "express";

export interface IExpense {
	title: string;
	category: string;
	expenseDate: Date;
	amount: number;
	account: string;
	finalAmount: number;
	createdAt?: Date;
	note?: string;
	userId?: string;
}

export interface IAggregationResponse {
	[key: string]: any;
}

export interface IRemainderPayload {
	title: string;
	account: string;
	category: string;
	amount: number;
	lastDate: string;
	billingDate?: string;
	status: "active" | "inactive";
	billingCycle: "monthly" | "yearly";
	addExpense?: boolean;
	userId?: string;
}
export type IMail = {
	to: string[];
	from?: { email: string; name: string };
	subject: string;
	body: string;
};

export interface IRequest extends Request {
	tokenData: {
		email: String;
		password: String;
		name: String;
		profilePic: String;
		banner: String;
		createdAt: Date;
		status: String;
		emailVerified: Boolean;
		otp: String;
		otpExpires: Date;
		projects: { projectName: string; projectId: string }[];
	};
}
export interface IResponse extends Response {}
