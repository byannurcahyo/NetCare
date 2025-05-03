import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { HandHeart, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleScrollToSection = (sectionId: string) => {
        if (window.location.pathname === "/") {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate(`/#${sectionId}`);
        }
    };

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <nav className="sticky top-0 z-50 p-4 bg-zinc-100 dark:bg-zinc-900 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/">
                        <div className="flex flex-row text-black dark:text-white text-lg font-bold justify-center items-center gap-2">
                            <HandHeart />
                            NetCare
                        </div>
                    </Link>
                    <ul>
                        <li className="inline-block mr-4">
                            <Button
                                variant="ghost"
                                onClick={() => handleScrollToSection("home")}
                                className="text-black dark:text-white hover:text-blue-500"
                            >
                                Home
                            </Button>
                        </li>
                        <li className="inline-block mr-4">
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    handleScrollToSection("packages")
                                }
                                className="text-black dark:text-white hover:text-blue-500"
                            >
                                Packages
                            </Button>
                        </li>
                    </ul>
                    <div className="flex justify-center items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative rounded-full"
                            onClick={() => navigate("/profile")}
                        >
                            <UserCircle />
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
            </nav>
        </ThemeProvider>
    );
}
