import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';

test('create expense', () => {
  render(<App />);

  const createExpenseNameInput = screen.getByPlaceholderText("Expense");
  const createExpenseCostInput = screen.getByPlaceholderText("0");
  const createExpenseButton = screen.getByText("Save");

  fireEvent.change(createExpenseNameInput, { target: { value: "Gambling" } });
  fireEvent.change(createExpenseCostInput, {
    target: { value: "562" },
  });
  fireEvent.click(createExpenseButton);

  const newExpenseName = screen.getByText("Gambling");
  const newExpenseCost = screen.getByText("$562");

  expect(newExpenseName).not.toBeInTheDocument();
  expect(newExpenseCost).toBeInTheDocument();

  const remaining = screen.getByText("Remaining: $438");
  const spentSoFar = screen.getByText("Spent so far: $562");

  expect(remaining).toBeInTheDocument();
  expect(spentSoFar).toBeInTheDocument();
})

test('delete expense', () => {
  render(<App />);

  const createExpenseNameInput = screen.getByPlaceholderText("Expense");
  const createExpenseCostInput = screen.getByPlaceholderText("0");
  const createExpenseButton = screen.getByText("Save");

  fireEvent.change(createExpenseNameInput, { target: { value: "Gambling" } });
  fireEvent.change(createExpenseCostInput, {
    target: { value: "562" },
  });
  fireEvent.click(createExpenseButton);

  const newExpenseName = screen.getByText("Gambling");
  const newExpenseCost = screen.getByText("$562");

  expect(newExpenseName).toBeInTheDocument();
  expect(newExpenseCost).toBeInTheDocument();

  var remaining = screen.getByText("Remaining: $438");
  var spentSoFar = screen.getByText("Spent so far: $562");

  expect(remaining).toBeInTheDocument();
  expect(spentSoFar).toBeInTheDocument();

  const deleteButton = screen.getByText("x");
  fireEvent.click(deleteButton);

  expect(newExpenseName).not.toBeInTheDocument();
  expect(newExpenseCost).not.toBeInTheDocument();

  remaining = screen.getByText("Remaining: $1000");
  spentSoFar = screen.getByText("Spent so far: $0");

  expect(remaining).toBeInTheDocument();
  expect(spentSoFar).toBeInTheDocument();
})

test('budget validation', () => {
  render(<App />);

  const createExpenseNameInput = screen.getByPlaceholderText("Expense");
  const createExpenseCostInput = screen.getByPlaceholderText("0");
  const createExpenseButton = screen.getByText("Save");

  fireEvent.change(createExpenseNameInput, { target: { value: "Gambling" } });
  fireEvent.change(createExpenseCostInput, {
    target: { value: "562" },
  });
  fireEvent.click(createExpenseButton);

  const newExpenseName = screen.getByText("Gambling");
  const newExpenseCost = screen.getByText("$562");

  expect(newExpenseName).toBeInTheDocument();
  expect(newExpenseCost).toBeInTheDocument();

  // $1000 budget = $438 remaining + $562 spent so far
  var remaining = screen.getByText("Remaining: $438");
  var spentSoFar = screen.getByText("Spent so far: $562");
  var budget = screen.getByText("Budget: $1000");

  expect(remaining).toBeInTheDocument();
  expect(spentSoFar).toBeInTheDocument();
  expect(budget).toBeInTheDocument();

  const deleteButton = screen.getByText("x");
  fireEvent.click(deleteButton);

  expect(newExpenseName).not.toBeInTheDocument();
  expect(newExpenseCost).not.toBeInTheDocument();

  // $1000 budget = $1000 remaining + $0 spent so far
  remaining = screen.getByText("Remaining: $1000");
  spentSoFar = screen.getByText("Spent so far: $0");
  budget = screen.getByText("Budget: $1000");

  expect(remaining).toBeInTheDocument();
  expect(spentSoFar).toBeInTheDocument();
  expect(budget).toBeInTheDocument();
})