// import Accounts from "../models/Accounts";
// import Credits from "../models/Credits";
// import Expense from "../models/Expense";
// import { IAggregationResponse } from "../utils/types";

// export const getProfile = async (_req: any, _res: any) => {
// 	try {
// 		const totalSpendsRes: IAggregationResponse[] = await Expense.aggregate([
// 			{
// 				$match: {
// 					userId: _req.tokenData.email
// 				}
// 			},
// 			{
// 				$group: {
// 					_id: null,
// 					total: { $sum: "$amount" }
// 				}
// 			}
// 		]);
// 		const totalCreditsRes: IAggregationResponse[] = await Credits.aggregate([
// 			{
// 				$match: {
// 					userId: _req.tokenData.email
// 				}
// 			},
// 			{
// 				$group: {
// 					_id: null,
// 					total: { $sum: "$amount" }
// 				}
// 			}
// 		]);
// 		const totalAccountCalcRes = await Accounts.aggregate([
// 			{
// 				$match: {
// 					userId: _req.tokenData.email,
// 					$and: [{ accountType: { $ne: "credit_card" } }, { active: true }]
// 				}
// 			},
// 			{
// 				$group: {
// 					_id: null,
// 					total: { $sum: "$amount" }
// 				}
// 			}
// 		]);

// 		console.log("totalAccountCalcRes", totalAccountCalcRes);

// 		const totalSpends = totalSpendsRes[0]?.total || 0;
// 		const totalCredits = totalCreditsRes[0]?.total || 0;
// 		const totalBalance = totalCredits - totalSpends || 0;
// 		const totalAccountBalance = totalAccountCalcRes[0]?.total || 0;
// 		return _res.status(200).json({ totalSpends, totalCredits, totalBalance, totalAccountBalance });
// 	} catch (error) {
// 		console.error("getProfile error: ", error);
// 		return _res.status(500).json({ message: error.message });
// 	}
// };
