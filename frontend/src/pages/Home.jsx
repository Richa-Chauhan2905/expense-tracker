import React, { useEffect } from "react";
import { useExpenseStore } from "../store/useExpenseStore.js";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    expenses,
    fetchExpenses,
    isLoading,
  } = useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-amber-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Expense Tracker</h1>

      <div className="flex gap-4 justify-center mb-8 flex-wrap">
        <Link to="/add-expense">
          <button className="border border-amber-500 text-amber-400 px-4 py-2 rounded hover:bg-amber-500 hover:text-slate-950 transition">
            Add Expense
          </button>
        </Link>

        <Link to="/filter-expenses">
          <button className="border border-amber-500 text-amber-400 px-4 py-2 rounded hover:bg-amber-500 hover:text-slate-950 transition">
            Filter Expenses
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Loader2 className="animate-spin text-amber-400 w-8 h-8" />
        </div>
      ) : (
        <div className="space-y-4 max-w-2xl mx-auto">
          {expenses && expenses.length > 0 ? (
            expenses.map((expense) => (
              <div
                key={expense._id}
                className="bg-slate-800 rounded-xl p-4 flex justify-between items-center shadow-md"
              >
                <div>
                  <h2 className="text-lg font-semibold">{expense.title}</h2>
                  <p className="text-sm text-slate-400">
                    {expense.category} • {expense.paymentMethod} • {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right font-bold text-amber-400">
                  ₹{expense.amount}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400">No expenses found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
