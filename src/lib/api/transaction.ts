import { ApiUrl } from "@/lib/config";
import type { Transaction } from "@/types";
import type { CreateTransaction, UpdateTransaction } from "@/types/request";
import axios from "axios";

export const getTransactions = async () => {
    try {
        const url = `${ApiUrl}/transactions`;
        const response = await axios.get<Transaction[]>(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return null;
    }
};

export const getTransactionByUser = async (
    userId: string,
): Promise<Transaction[]> => {
    try {
        const url = `${ApiUrl}/transactions`;
        const response = await axios.get<Transaction[]>(url, {
            params: {
                userId: userId,
            },
        });
        return response.data.filter((t: Transaction) => t.userId === userId);
    } catch (error) {
        console.error("Error fetching transaction:", error);
        return [];
    }
};

export const createTransaction = async (
    transaction: CreateTransaction,
): Promise<Transaction> => {
    try {
        const url = `${ApiUrl}/transactions`;
        const response = await axios.post<Transaction>(url, transaction);
        return response.data;
    } catch {
        throw new Error("Failed to create transaction");
    }
};

export const updateTransaction = async (
    transaction: UpdateTransaction,
): Promise<Transaction> => {
    try {
        const url = `${ApiUrl}/transactions/${transaction.id}`;
        const response = await axios.patch<Transaction>(url, {
            status: transaction.status,
        });
        return response.data;
    } catch {
        throw new Error("Failed to update transaction");
    }
};
