import type { User } from "@/types";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

interface SessionContextType {
    user: User | null;
    setUser: (user: User) => void;
    clearSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const [user, setUserState] = useState<User | null>(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const setUser = (user: User) => {
        const { id, fullName, username, email, role } = user;
        const sessionUser = { id, fullName, username, email, role };
        localStorage.setItem("user", JSON.stringify(sessionUser));
        setUserState(sessionUser);
    };

    const clearSession = () => {
        localStorage.removeItem("user");
        setUserState(null);
        navigate("/login", { replace: true });
    };

    return (
        <SessionContext.Provider value={{ user, setUser, clearSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};
