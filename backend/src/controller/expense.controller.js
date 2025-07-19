import Expense from "../models/expense.model.js";

export const addExpense = async (req, res) => {
  const { title, amount, date, category, paymentMethod } = req.body;

  if (!title || !amount || !date || !category) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  try {
    const expense = new Expense({
      title,
      amount,
      date,
      category,
      paymentMethod,
      userId: req.user._id,
    });

    await expense.save();

    return res.status(201).json({ message: "Expense added: ", expense });
  } catch (error) {
    console.log("Error in addExpense controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });
    return res.status(200).json({
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    console.log("Error in getExpense controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    console.log("Error in getExpense controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while deleting expense",
      error,
    });
  }
};

export const filterExpenses = async (req, res) => {
  try {
    const { category, paymentMethod, minAmount, maxAmount } = req.query;
    const query = { userId: req.user._id };

    if (category) query.category = category;
    if (paymentMethod) query.paymentMethod = paymentMethod;

    // Add amount filtering
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = parseFloat(minAmount);
      if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
    }

    const expenses = await Expense.find(query).sort({ date: -1 }); // Newest first

    res.status(200).json({
      message: "Filtered expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    console.error("Filter error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
