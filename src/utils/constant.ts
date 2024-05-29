import moment from "moment";
import { Subject } from "rxjs";

import { IAnyObject } from "./types";

export const filterSubject = new Subject();
export const addRemainderSubject = new Subject();

export const iconsList: IAnyObject = {
	cash: "/icons/cash.png",
	hdfc: "/icons/hdfc.png",
	kotak: "/icons/kotak.png",
	paytm: "/icons/paytm.svg",
	paytm_wallet: "/icons/paytm.svg",
	hdfc_credit: "/icons/hdfc_card.png",
	phonepe: "/icons/phonepe.png",
	airtel: "/icons/airtel.png",
	pnb: "/icons/pnb.png",
	food: "/icons/food.png",
	travel: "/icons/payment.png",
	shopping: "/icons/shopping.png",
	entertainment: "/icons/payment.png",
	others: "/icons/payment.png",
	lend: "/icons/give-money.png",
	bill: "/icons/payment.png",
	foods: "/icons/payment.png",
	grocery: "/icons/payment.png",
	medical: "/icons/payment.png",
	rent: "/icons/payment.png",
	loan: "/icons/payment.png",
	spending: "/icons/spending.png",
	netflix: "/icons/netflix.png",
	amazon: "/icons/shopping.png",
	phone: "/icons/ppaymentone.png",
	recharge: "/icons/payment.png",
	home: "/icons/payment.png",
	lic: "/icons/payment.png",
	ro: "/icons/shopping.png",
	icici: "/icons/bank.png",
	axis: "/icons/bank.png",
	sbi: "/icons/bank.png",
	bank: "/icons/bank.png",
	health: "/icons/health.png",
	payment: "/icons/payment.png"
};

export const getMonthsList = () => {
	const year = moment().year();
	const currentMonth = moment().month();

	const months = [];

	// Iterate over each month of the current year
	for (let month = 0; month <= currentMonth; month++) {
		const startDate = moment().year(year).month(month).startOf("month");
		const endDate = moment().year(year).month(month).endOf("month");
		const monthName = startDate.format("MMMM"); // Get the full name of the month

		months.push({
			startDate: startDate.format("YYYY-MM-DD"),
			endDate: endDate.format("YYYY-MM-DD"),
			name: monthName
		});
	}

	return months;
};

export const getFloatingDates = () => {
	const data = [];
	const today = moment().add(1, "day").format("YYYY-MM-DD");

	// last 3 months
	const last3months = moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD");
	data.push({
		startDate: last3months,
		endDate: today,
		name: "Last 3 Months"
	});

	// last 3 months
	const last6months = moment().subtract(6, "months").startOf("month").format("YYYY-MM-DD");
	data.push({
		startDate: last6months,
		endDate: today,
		name: "Last 6 Months"
	});

	// this year
	let thisYear = moment().startOf("year").format("YYYY-MM-DD");
	data.push({
		startDate: thisYear,
		endDate: today,
		name: "This Year"
	});

	// last year
	const startDateOfLastYear = moment().subtract(1, "year").startOf("year").format("YYYY-MM-DD");
	const endDateOfLastYear = moment().subtract(1, "year").endOf("year").add(1, "day").format("YYYY-MM-DD");
	data.push({
		startDate: startDateOfLastYear,
		endDate: endDateOfLastYear,
		name: "Last Year"
	});

	data.push({
		startDate: startDateOfLastYear,
		endDate: today,
		name: "From Last Year"
	});

	data.push({
		startDate: "2020-01-01",
		endDate: today,
		name: "All"
	});
	return data;
};

export const analyticsFilterTypeOptions = [
	{ label: "Category", value: "category" },
	{ label: "Account", value: "account" }
];
