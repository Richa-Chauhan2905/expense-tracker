import React, { useEffect, useState } from "react";
import {
  Loader2,
  Edit,
  Trash2,
  Filter,
  X,
  Check,
  DollarSign,
  LogOut,
} from "lucide-react";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import piggyBank from "../assets/piggy_bank.png";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "Miscellaneous",
    paymentMethod: "Cash",
    notes: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    paymentMethod: "",
    minAmount: "",
    maxAmount: "",
  });
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/expense/get-expenses", {
        params: filters,
        withCredentials: true,
      });
      setExpenses(response.data?.expenses || []);
      calculateTotal(response.data?.expenses || []);
      setError(null);
    } catch (error) {
      setError("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (expenses) => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(total);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const addExpense = async () => {
    try {
      const response = await axiosInstance.post(
        "/expense/add-expense",
        newExpense,
        { withCredentials: true }
      );
      setExpenses([response.data.expense, ...expenses]);
      setTotalExpenses((prev) => prev + response.data.expense.amount);
      resetForm();
      toast.success("Expense added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  const startEdit = (expense) => {
    setEditingId(expense._id);
    setEditData({
      title: expense.title,
      amount: expense.amount,
      date: new Date(expense.date).toISOString().split("T")[0],
      category: expense.category,
      paymentMethod: expense.paymentMethod,
      notes: expense.notes || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const updateExpense = async () => {
    try {
      const response = await axiosInstance.put(
        `/expense/update-expense/${editingId}`,
        editData,
        { withCredentials: true }
      );
      setExpenses(
        expenses.map((exp) =>
          exp._id === editingId ? response.data.expense : exp
        )
      );
      calculateTotal(
        expenses.map((exp) =>
          exp._id === editingId ? response.data.expense : exp
        )
      );
      setEditingId(null);
      toast.success("Expense updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`/expense/delete-expense/${id}`, {
        withCredentials: true,
      });
      setExpenses(expenses.filter((exp) => exp._id !== id));
      calculateTotal(expenses.filter((exp) => exp._id !== id));
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const updateCurrencyPreference = async () => {
    try {
      await axiosInstance.patch(
        "/user/currency",
        { currencyPreference: currency },
        { withCredentials: true }
      );
      toast.success(`Currency updated to ${currency}`);
      setShowCurrencyModal(false);
    } catch (error) {
      toast.error("Failed to update currency");
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout", {}, { withCredentials: true });
      localStorage.removeItem("jwt");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const applyFilters = () => {
    fetchExpenses();
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      paymentMethod: "",
      minAmount: "",
      maxAmount: "",
    });
    fetchExpenses();
    setShowFilters(false);
  };

  const resetForm = () => {
    setNewExpense({
      title: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      category: "Miscellaneous",
      paymentMethod: "Cash",
      notes: "",
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-amber-50 p-4 md:p-8">
      <header className="mb-8 relative">
        <div className="absolute top-0 right-0 flex gap-5">
          <button
            onClick={() => setShowCurrencyModal(true)}
            className="text-amber-400 hover:text-amber-300 transition"
            title="Change Currency"
          >
            {currency}
          </button>
          <button
            onClick={handleLogout}
            className="text-amber-400 hover:text-amber-300 transition"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
        <img
          src={piggyBank}
          alt="SpendWise Logo"
          className="w-13 h-13 rounded-full shadow-lg mb-2 border-4 border-[#222] bg-[#18181b]"
        />
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="bg-slate-800 p-4 rounded-lg text-center min-w-[200px]">
            <p className="text-sm text-slate-400">Total Expenses</p>
            <p className="text-2xl font-bold text-amber-400">
              {totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 border border-amber-500 text-amber-400 px-4 py-2 rounded hover:bg-amber-500 hover:text-slate-950 transition"
          >
            {showForm ? <X size={18} /> : "Add Expense"}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border border-amber-500 text-amber-400 px-4 py-2 rounded hover:bg-amber-500 hover:text-slate-950 transition"
          >
            <Filter size={18} /> Filter
          </button>
        </div>
      </header>

      {showFilters && (
        <div className="max-w-md mx-auto mb-8 bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex justify-between">
            <span>Filter Expenses</span>
            <button onClick={() => setShowFilters(false)}>
              <X size={20} />
            </button>
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full bg-slate-700 rounded px-3 py-2"
              >
                <option value="">All Categories</option>
                {[
                  "Food",
                  "Utilities",
                  "Transport",
                  "Groceries",
                  "Rent",
                  "Finance",
                  "Health",
                  "Education",
                  "Miscellaneous",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm">Payment Method</label>
              <select
                name="paymentMethod"
                value={filters.paymentMethod}
                onChange={(e) =>
                  setFilters({ ...filters, paymentMethod: e.target.value })
                }
                className="w-full bg-slate-700 rounded px-3 py-2"
              >
                <option value="">All Methods</option>
                {["Cash", "Card", "UPI", "NetBanking"].map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Min Amount</label>
                <input
                  type="number"
                  name="minAmount"
                  value={filters.minAmount}
                  onChange={(e) =>
                    setFilters({ ...filters, minAmount: e.target.value })
                  }
                  className="w-full bg-slate-700 rounded px-3 py-2"
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Max Amount</label>
                <input
                  type="number"
                  name="maxAmount"
                  value={filters.maxAmount}
                  onChange={(e) =>
                    setFilters({ ...filters, maxAmount: e.target.value })
                  }
                  className="w-full bg-slate-700 rounded px-3 py-2"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={applyFilters}
                className="flex-1 bg-amber-500 text-slate-950 py-2 rounded font-semibold hover:bg-amber-600 transition"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="flex-1 bg-slate-700 text-amber-400 py-2 rounded font-semibold hover:bg-slate-600 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="max-w-md mx-auto mb-8 bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Title</label>
              <input
                type="text"
                name="title"
                value={newExpense.title}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Amount</label>
              <input
                type="number"
                name="amount"
                value={newExpense.amount}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded px-3 py-2"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Date</label>
              <input
                type="date"
                name="date"
                value={newExpense.date}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Category</label>
              <select
                name="category"
                value={newExpense.category}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded px-3 py-2"
                required
              >
                {[
                  "Food",
                  "Utilities",
                  "Transport",
                  "Groceries",
                  "Rent",
                  "Finance",
                  "Health",
                  "Education",
                  "Miscellaneous",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm">Payment Method</label>
              <select
                name="paymentMethod"
                value={newExpense.paymentMethod}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded px-3 py-2"
                required
              >
                {["Cash", "Card", "UPI", "NetBanking"].map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm">Notes (Optional)</label>
              <textarea
                name="notes"
                value={newExpense.notes}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded px-3 py-2"
                rows="2"
              />
            </div>

            <button
              onClick={addExpense}
              className="w-full bg-amber-500 text-slate-950 py-2 rounded font-semibold hover:bg-amber-600 transition"
            >
              Add Expense
            </button>
          </div>
        </div>
      )}

      <main>
        {loading ? (
          <div className="flex justify-center mt-10">
            <Loader2 className="animate-spin text-amber-400 w-8 h-8" />
          </div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="bg-slate-800 rounded-xl p-4 shadow-md hover:bg-slate-700 transition"
                >
                  {editingId === expense._id ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <input
                          type="text"
                          name="title"
                          value={editData.title}
                          onChange={handleEditChange}
                          className="flex-1 bg-slate-700 rounded px-2 py-1 mr-2"
                        />
                        <input
                          type="number"
                          name="amount"
                          value={editData.amount}
                          onChange={handleEditChange}
                          className="w-24 bg-slate-700 rounded px-2 py-1"
                          min="0"
                          step="0.01"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <select
                          name="category"
                          value={editData.category}
                          onChange={handleEditChange}
                          className="bg-slate-700 rounded px-2 py-1"
                        >
                          {[
                            "Food",
                            "Utilities",
                            "Transport",
                            "Groceries",
                            "Rent",
                            "Finance",
                            "Health",
                            "Education",
                            "Miscellaneous",
                          ].map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>

                        <select
                          name="paymentMethod"
                          value={editData.paymentMethod}
                          onChange={handleEditChange}
                          className="bg-slate-700 rounded px-2 py-1"
                        >
                          {["Cash", "Card", "UPI", "NetBanking"].map(
                            (method) => (
                              <option key={method} value={method}>
                                {method}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div className="flex justify-between">
                        <input
                          type="date"
                          name="date"
                          value={editData.date}
                          onChange={handleEditChange}
                          className="bg-slate-700 rounded px-2 py-1"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={cancelEdit}
                            className="bg-slate-700 text-amber-400 px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={updateExpense}
                            className="bg-amber-500 text-slate-950 px-3 py-1 rounded"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h2 className="text-lg font-semibold">
                            {expense.title}
                          </h2>
                          <span className="font-bold text-amber-400 ml-4">
                            ₹{expense.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 text-sm text-slate-400">
                          <span className="bg-slate-700 px-2 py-1 rounded">
                            {expense.category}
                          </span>
                          <span className="bg-slate-700 px-2 py-1 rounded">
                            {expense.paymentMethod}
                          </span>
                          <span className="bg-slate-700 px-2 py-1 rounded">
                            {new Date(expense.date).toLocaleDateString()}
                          </span>
                        </div>
                        {expense.notes && (
                          <p className="mt-2 text-slate-300">{expense.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => startEdit(expense)}
                          className="text-amber-400 hover:text-amber-300 transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteExpense(expense._id)}
                          className="text-red-400 hover:text-red-300 transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-400 mb-4">No expenses found</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="border border-amber-500 text-amber-400 px-4 py-2 rounded hover:bg-amber-500 hover:text-slate-950 transition"
                >
                  Add Your First Expense
                </button>
              </div>
            )}
            {/* Currency Modal */}
            {showCurrencyModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-slate-800 p-6 rounded-lg max-w-sm w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Change Currency</h2>
                    <button onClick={() => setShowCurrencyModal(false)}>
                      <X size={20} />
                    </button>
                  </div>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-slate-700 rounded px-3 py-2 mb-4"
                  >
                    {["INR", "USD", "EUR", "GBP", "JPY", "AUD"].map((curr) => (
                      <option key={curr} value={curr}>
                        {curr}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={updateCurrencyPreference}
                    className="w-full bg-amber-500 text-slate-950 py-2 rounded font-semibold hover:bg-amber-600 transition"
                  >
                    Update Currency
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
