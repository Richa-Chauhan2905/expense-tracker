import express from "express";
import { addExpense, deleteExpense, filterExpenses, getExpenses, updateExpense } from "../controller/expense.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add-expense", protectRoute, addExpense);
router.get("/get-expenses", protectRoute, getExpenses);
router.put("/update-expense/:id", protectRoute, updateExpense);
router.delete("/delete-expense/:id", protectRoute, deleteExpense);
router.get("/filter", protectRoute, filterExpenses);

export default router