import { ApiUrl } from "@/lib/config";
import type { User } from "@/types";
import type { LoginRequest, RegisterRequest } from "@/types/request";
import axios from "axios";

export const registerUser = async ({
    fullName,
    email,
    password,
}: RegisterRequest): Promise<User> => {
    try {
        const username = fullName.replace(/\s+/g, "").toLowerCase();
        const url = `${ApiUrl}/users`;
        const response = await axios.post<User>(url, {
            fullName: fullName,
            username: username,
            email: email,
            password: password,
            role: "user",
        });
        const user = response.data;
        return user;
    } catch {
        throw new Error("Failed to register");
    }
};

export const loginUser = async ({
    email,
    password,
}: LoginRequest): Promise<User> => {
    try {
        const url = `${ApiUrl}/users`;
        const response = await axios.get<User[]>(url, {
            params: {
                email: email,
                password: password,
            },
        });
        const user = response.data.find(
            (u: User) => u.email === email && u.password === password,
        );
        if (!user) {
            throw new Error("Invalid email or password");
        }
        return user;
    } catch {
        throw new Error("Failed to login");
    }
};
