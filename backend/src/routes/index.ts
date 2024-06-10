import express from "express";
import { addNewAccount, deleteAccount, getAllAccounts, updateOneAccount } from "../controllers/accounts";

import { addNewExpense, deleteOneExpense, getAllExpenses, getTotalSpendAmount, updateOneExpense } from "../controllers/expense";
import { getProfile } from "../controllers/profile";
import { login, resendOtp, sendMarketingEmail, signup, verifyOtp } from "../controllers/auth";
import { BasicAuth } from "../utils/BasicAuth";
import { AuthGuard } from "../utils/AuthGuard";
import { getIncomeVsCredit, getSpendAnalytics, getSpendAnalyticsByCategory } from "../controllers/analytics";
import { addNewRemainder, deleteRemainder, getAllRemainders, updateOneRemainder } from "../controllers/remainders";
import { getAllCategories, addNewCategory, updateOneCategory, deleteCategory } from "../controllers/categories";

const router = express.Router();

// login routes
router.post("/login", BasicAuth, login);
router.post("/signup", BasicAuth, signup);
router.post("/verify_otp", BasicAuth, verifyOtp);
router.post("/resend_otp", resendOtp);
router.get("/send_marketing_email", sendMarketingEmail);

// expense routes
router.post("/spends", [AuthGuard], addNewExpense);
router.get("/spends", [AuthGuard], getAllExpenses);
router.patch("/spends/:id", [AuthGuard], updateOneExpense);
router.delete("/spends/:id", [AuthGuard], deleteOneExpense);
router.get("/spends/total", [AuthGuard], getTotalSpendAmount);

// profile routes
router.get("/profile", [AuthGuard], getProfile);

// bank accounts & cards
router.get("/accounts", [AuthGuard], getAllAccounts);
router.post("/accounts", [AuthGuard], addNewAccount);
router.patch("/accounts/:id", [AuthGuard], updateOneAccount);
router.delete("/accounts/:id", [AuthGuard], deleteAccount);

// categories
router.get("/categories", [AuthGuard], getAllCategories);
router.post("/categories", [AuthGuard], addNewCategory);
router.patch("/categories/:id", [AuthGuard], updateOneCategory);
router.delete("/categories/:id", [AuthGuard], deleteCategory);

// analytics
router.get("/analytics/expense", [AuthGuard], getSpendAnalytics);
router.get("/analytics/type", [AuthGuard], getSpendAnalyticsByCategory);
router.get("/analytics/yearly_comparision", [AuthGuard], getIncomeVsCredit);

// remainders
router.get("/remainders", [AuthGuard], getAllRemainders);
router.post("/remainders", [AuthGuard], addNewRemainder);
router.patch("/remainders/:id", [AuthGuard], updateOneRemainder);
router.delete("/remainders/:id", [AuthGuard], deleteRemainder);

export default router;
