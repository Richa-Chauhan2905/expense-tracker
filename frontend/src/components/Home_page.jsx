import React, { useState } from "react";
import { motion } from "framer-motion";

const Home_page = () => {
  const [selectedMonths, setSelectedMonths] = useState(() => {
    const savedMonths = localStorage.getItem("selectedMonths");
    return savedMonths ? JSON.parse(savedMonths) : [];
  });

  return (
    <motion.div
      className="h-screen bg-blue-200 flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex flex-col gap-4 items-center p-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-4xl font-bold text-black">Make every expense count.</p>
        <p className="text-black text-lg">Select a Month and Year</p>

        <div className="flex flex-col gap-2 w-full items-center">
          <label htmlFor="month" className="text-black text-base">
            Month-Year
          </label>
          <motion.input
            type="month"
            id="month"
            className="w-60 px-4 py-2 rounded-lg bg-white text-black border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            whileFocus={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 120 }}
          />
        </div>

        {/* Render boxes for each selected month */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {selectedMonths.map((monthStr, index) => {
            const [year, month] = monthStr.split("-");
            const display = `${month}-${year}`;

            return (
              <motion.div
                key={index}
                className="px-4 py-2 bg-white text-black border border-gray-400 rounded flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span className="font-medium">{display}</span>
                <button className="text-red-600 hover:text-red-800 font-bold text-sm">
                  ✕
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home_page;

