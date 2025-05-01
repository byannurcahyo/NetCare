import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
    const { setTheme } = useTheme();
    const toggleTheme = () => {
        const currentTheme = localStorage.getItem("vite-ui-theme") ?? "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            onClick={() => {
                toggleTheme();
            }}
        >
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all transform dark:-rotate-90 dark:scale-0" />
            <Sun className="h-[1.2rem] w-[1.2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
