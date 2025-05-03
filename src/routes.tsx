import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import Package from "./pages/Package.tsx";
import Profile from "./pages/Profile.tsx";
import Register from "./pages/Register.tsx";
import Transaction from "./pages/Transaction.tsx";
import User from "./pages/User.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "packages",
                element: <Package />,
            },
            {
                path: "transactions",
                element: <Transaction />,
            },
            {
                path: "users",
                element: <User />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
]);
export default router;
