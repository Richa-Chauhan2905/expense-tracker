import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000";

export const useExpenseStore = create((set, get) => ({
  expenses: [],
  isLoading: false,

  // Set the expenses manually
  setExpenses: (expenses) => set({ expenses }),

  // Fetch all expenses from backend
  fetchExpenses: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/expense/get-expenses");
      set({ expenses: res.data.expenses });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch expenses");
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new expense
  addExpense: async (expenseData) => {
    try {
      const res = await axiosInstance.post("/expense/add-expense", expenseData);
      const newExpense = res.data.expense;
      set((state) => ({
        expenses: [newExpense, ...(state.expenses || [])],
      }));
      toast.success("Expense added!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add expense");
    }
  },

  // Delete an expense
  deleteExpense: async (expenseId) => {
    try {
      await axiosInstance.delete(`/expense/delete-expense/${expenseId}`);
      set((state) => ({
        expenses: state.expenses.filter((e) => e._id !== expenseId),
      }));
      toast.success("Expense deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete expense");
    }
  },

  // Update an expense
  updateExpense: async (expenseId, updatedData) => {
    try {
      const res = await axiosInstance.put(
        `/expense/update-expense/${expenseId}`,
        updatedData
      );
      const updatedExpense = res.data.expense;
      set((state) => ({
        expenses: state.expenses.map((e) =>
          e._id === expenseId ? updatedExpense : e
        ),
      }));
      toast.success("Expense updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update expense");
    }
  },

  filterExpenses: async ({ date, category, paymentMethod }) => {
    try {
      set({ isLoading: true });
      const params = new URLSearchParams();

      if (date) params.append("date", date);
      if (category) params.append("category", category);
      if (paymentMethod) params.append("paymentMethod", paymentMethod);

      const res = await axiosInstance.get(
        `/expense/filter?${params.toString()}`
      );
      set({ expenses: res.data.expenses });
    } catch (error) {
      console.error(error);
      toast.error("Failed to filter expenses");
    } finally {
      set({ isLoading: false });
    }
  },
}));
