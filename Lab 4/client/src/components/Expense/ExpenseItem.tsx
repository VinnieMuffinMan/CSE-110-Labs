import { Expense } from "../../types/types";
import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const context = useContext(AppContext);

  const handleDeleteExpense = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, description: string) => {
    // Exercise: Remove expense from expenses context array
    // let index = context.expenses.indexOf(currentExpense);
    event.preventDefault();
    deleteExpense(id);
    context.setExpenses(context.expenses.filter(expense => expense.description != description));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={(event) => handleDeleteExpense(event, currentExpense.id, currentExpense.description)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
