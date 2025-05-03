import { SessionProvider } from "@/contexts/SessionContext";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <SessionProvider>
            <Outlet />
        </SessionProvider>
    );
}
