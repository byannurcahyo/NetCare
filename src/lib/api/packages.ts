import { ApiUrl } from "@/lib/config";
import type { Package } from "@/types";
import axios from "axios";

export const getPackages = async () => {
    try {
        const url = `${ApiUrl}/packages`;
        const response = await axios.get<Package[]>(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching packages:", error);
        return null;
    }
};
