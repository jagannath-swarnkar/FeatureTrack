import express from "express";

import { login, resendOtp, sendMarketingEmail, signup, verifyOtp } from "../controllers/auth";
import { addNewModule, deleteModule, getAllModules, updateOneModule } from "../controllers/modules";
import { getProfile } from "../controllers/profile";
import { AuthGuard } from "../utils/AuthGuard";
import { BasicAuth } from "../utils/BasicAuth";
import { addNewPage, deletePage, getAllPages, updateOnePage } from "../controllers/pages";
import { getAllComponents, addNewComponent, deleteComponent, updateOneComponent } from "../controllers/components";
import { getAllComments, updateOneComment, deleteComment, addNewComment } from "../controllers/comments";

const router = express.Router();

// login routes
router.post("/login", BasicAuth, login);
router.post("/signup", BasicAuth, signup);
router.post("/verify_otp", BasicAuth, verifyOtp);
router.post("/resend_otp", resendOtp);
router.get("/send_marketing_email", sendMarketingEmail);

// profile routes
router.get("/profile", [AuthGuard], getProfile);

// modules ( high level )
router.get("/modules", [AuthGuard], getAllModules);
router.post("/modules", [AuthGuard], addNewModule);
router.patch("/modules/:id", [AuthGuard], updateOneModule);
router.delete("/modules/:id", [AuthGuard], deleteModule);

// pages ( high level or module > pages)
router.get("/pages", [AuthGuard], getAllPages);
router.post("/pages", [AuthGuard], addNewPage);
router.patch("/pages/:id", [AuthGuard], updateOnePage);
router.delete("/pages/:id", [AuthGuard], deletePage);

// components ( high level or module > pages OR module > pages > components OR pages > components)
router.get("/components", [AuthGuard], getAllComponents);
router.post("/components", [AuthGuard], addNewComponent);
router.patch("/components/:id", [AuthGuard], updateOneComponent);
router.delete("/components/:id", [AuthGuard], deleteComponent);

// Comments ( components > comment )
router.get("/comments", [AuthGuard], getAllComments);
router.post("/comments", [AuthGuard], addNewComment);
router.patch("/comments/:id", [AuthGuard], updateOneComment);
router.delete("/comments/:id", [AuthGuard], deleteComment);

export default router;
