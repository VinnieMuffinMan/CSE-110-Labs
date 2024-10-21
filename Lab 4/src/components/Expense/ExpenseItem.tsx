import { Expense } from "../../types/types";
import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const context = useContext(AppContext);

  const handleDeleteExpense = (name: string) => {
    // Exercise: Remove expense from expenses context array
    // let index = context.expenses.indexOf(currentExpense);
    context.setExpenses(context.expenses.filter(expense => expense.name != name));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense.name)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
