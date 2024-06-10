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
