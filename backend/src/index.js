import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/expense", expenseRoutes);

app.listen(5000, () => {
  console.log(`Listening on port ${port}`);
  connectDB();
});
