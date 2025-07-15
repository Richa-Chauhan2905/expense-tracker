import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: {
    type: String,
    enum: [
      "Food",
      "Utilities",
      "Transport",
      "Groceries",
      "Rent",
      "Finance",
      "Health",
      "Education",
      "Miscellaneous",
    ],
    required: true,
  },
  notes: { type: String },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "UPI", "NetBanking"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
