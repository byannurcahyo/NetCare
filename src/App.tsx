import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./components/ui/button";

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="flex flex-col min-h-screen justify-center items-center gap-4">
                <h1 className="text-5xl font-bold">Welcome to NetCare</h1>
                <div className="flex flex-row gap-2">
                    <Button className="bg-zinc-900 text-white hover:bg-zinc-950">
                        Login
                    </Button>
                    <Button className="bg-zinc-800 text-white hover:bg-zinc-900">
                        Dashboard
                    </Button>
                    <Button className="bg-zinc-700 text-white hover:bg-zinc-800">
                        Package
                    </Button>
                    <Button className="bg-zinc-600 text-white hover:bg-zinc-700">
                        Profile
                    </Button>
                </div>
                <ModeToggle />
            </div>
        </ThemeProvider>
    );
}
