import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    // TO DO: Implement deleteExpense function
    const id = req.params.id;

    const index = expenses.findIndex((expense) => expense.id === id);

    expenses.splice(index, 1);
    res.status(200).send({ message: 'Item deleted successfully' });
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}