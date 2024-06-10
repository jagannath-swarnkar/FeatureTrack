import moment from "moment";
import Credits from "../models/Credits";
import ExpenseModel from "../models/Expense";

export const getSpendAnalytics = async (_req: any, _res: any) => {
	const { startDate, endDate, dataType } = _req.query;
	if (!startDate || !endDate) {
		return _res.status(400).json({ message: "startDate and endDate are required!" });
	}
	try {
		const totalSpendsRes: any = await ExpenseModel.aggregate([
			{
				$match: {
					userId: _req.tokenData.email,
					expenseDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
				}
			},
			{
				$group: {
					_id: null,
					totalLend: {
						$sum: {
							$cond: [{ $eq: ["$category", "lend"] }, "$amount", 0]
						}
					},
					totalSpendings: {
						$sum: {
							$cond: [{ $ne: ["$category", "lend"] }, "$amount", 0]
						}
					}
				}
			}
		]);

		const totalEarningsRes: any = await Credits.aggregate([
			{
				$match: {
					userId: _req.tokenData.email,
					category: { $ne: "owed" },
					creditDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
				}
			},
			{
				$group: {
					_id: null,
					total: { $sum: "$amount" }
				}
			}
		]);
		let spendings = totalSpendsRes[0] || {};
		let totalEarnings = totalEarningsRes[0]?.total || 0;
		let balance = totalEarnings - spendings?.totalSpendings - spendings?.totalLend;

		if (dataType === "object") {
			let res = {
				totalSpends: spendings?.totalSpendings,
				totalEarnings: totalEarnings,
				totalLend: spendings?.totalLend,
				balance: balance
			};
			return _res.status(200).json(res);
		}

		let result = {
			labels: ["Spends", "Lend", "Balance"],
			series: [spendings?.totalSpendings || 0, spendings?.totalLend || 0, balance]
		};
		return _res.status(200).json(result);
	} catch (error) {
		console.error("getTotalSpendAmount error: ", error);
		return _res.status(500).json({ message: error.message });
	}
};
export const getSpendAnalyticsByCategory = async (_req: any, _res: any) => {
	const { startDate, endDate, type = "category", dataType } = _req.query;
	if (!startDate || !endDate) {
		return _res.status(400).json({ message: "startDate and endDate are required!" });
	}
	try {
		const totalSpendsRes: any = await ExpenseModel.aggregate([
			{
				$match: {
					userId: _req.tokenData.email,
					expenseDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
				}
			},
			{
				$group: {
					_id: `$${type}`,
					totalSum: { $sum: "$amount" }
				}
			}
		]);

		if (dataType === "object") {
			let res = totalSpendsRes.map((item: any) => ({ label: item._id, value: item.totalSum }));
			return _res.status(200).json(res);
		}

		let result: any = {
			labels: [],
			series: []
		};
		totalSpendsRes?.forEach((item: any) => {
			result.series.push(item.totalSum);
			result.labels.push(item._id);
		});

		return _res.status(200).json(result);
	} catch (error) {
		console.error("getTotalSpendAmount error: ", error);
		return _res.status(500).json({ message: error.message });
	}
};

export const getIncomeVsCredit = async (_req: any, _res: any) => {
	const { year, dataType } = _req.query;
	if (!year) {
		return _res.status(400).json({ message: "year is required!" });
	}
	try {
		const totalSpendsRes: any = await ExpenseModel.aggregate([
			{
				$match: {
					userId: _req.tokenData.email,
					expenseDate: { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31) }
				}
			},
			{
				$group: {
					_id: { $month: "$expenseDate" },
					totalSum: { $sum: "$amount" }
				}
			}
		]);
		const totalCreditRes: any = await Credits.aggregate([
			{
				$match: {
					userId: _req.tokenData.email,
					creditDate: { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31) }
				}
			},
			{
				$group: {
					_id: { $month: "$creditDate" },
					totalSum: { $sum: "$amount" }
				}
			}
		]);
		let months = Array.from({ length: 12 }, (_, i) => i + 1);

		let data: any = {};

		months.forEach(function (month: any) {
			data[month] = {
				totalSpends: 0,
				totalCredits: 0,
				month: moment()
					.month(month - 1)
					.format("MMMM")
			};
		});

		totalSpendsRes.forEach(function (spend: any) {
			let month = spend._id;
			data[month].totalSpends = spend.totalSum;
		});

		totalCreditRes.forEach(function (credit: any) {
			let month = credit._id;
			data[month].totalCredits = credit.totalSum;
		});
		if (dataType === "object") {
			return _res.status(200).json(Object.values(data));
		}

		let result: any = {
			categories: [],
			series: []
		};
		let spendData: number[] = [];
		let creditData: number[] = [];
		Object.values(data).forEach((item: any) => {
			result.categories.push(item.month);
			spendData.push(item.totalSpends);
			creditData.push(item.totalCredits);
		});
		result.series.push({ data: creditData, name: "Total Credits" });
		result.series.push({ data: spendData, name: "Total Spends" });

		return _res.status(200).json(result);
	} catch (error) {
		console.error("getTotalSpendAmount error: ", error);
		return _res.status(500).json({ message: error.message });
	}
};
