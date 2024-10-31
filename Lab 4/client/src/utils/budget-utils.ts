import { API_BASE_URL } from "../constants/constants";
import { Expense } from "../types/types";

// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
    	method: "GET"
	});
	if (!response.ok) {
    	throw new Error("Failed to fetch budget");
	}
    let budget = response.json().then((jsonResponse) => {
    	return jsonResponse.data;
	});
	return budget;
};

// Function to update the budget in the backend. Method: PUT
export const updateBudget = async (budget: number): Promise<number> => {
	const response = await fetch(`${API_BASE_URL}/budget`, {
    	method: "PUT",
		headers: {
        	"Content-Type": "application/json",
    	},
		body: JSON.stringify({amount: budget})
	});
	if (!response.ok) {
    	throw new Error("Failed to update budget");
	}
	return budget;
};
