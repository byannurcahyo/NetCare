import { ApiUrl } from "@/lib/config";
import type { User } from "@/types";
import axios from "axios";

export const getUsers = async () => {
    try {
        const url = `${ApiUrl}/users`;
        const response = await axios.get<User[]>(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
};
