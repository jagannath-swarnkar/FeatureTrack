import cors from "cors";
import express from "express";
import routes from "./routes";
import { AuthGuard } from "./utils/AuthGuard";
import Expense from "./models/Expense";
require("dotenv").config();
require("./connections/db");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.get("/", (_req, _res) => {
	_res.send("Welcome to the Express API");
});
app.patch("/bulk_update", [AuthGuard], async (_req: any, _res: any) => {
	try {
		const updated = await Expense.updateMany({}, { userId: _req.tokenData.email });
		return _res.status(200).json(updated);
	} catch (error) {
		console.error("console error: ", error);
		return _res.status(500).send({
			message: error.message || "Internal Server Error!",
			code: 500
		});
	}
});

app.use(routes);

app.listen(process.env.PORT, () => {
	console.log(`Application is running on port: ${process.env.PORT}`);
});
