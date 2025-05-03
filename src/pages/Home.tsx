import Hero from "@/components/hero";
import PricingPackages from "@/components/pricing-packages";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/layouts/Navbar";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Navbar />
            <Hero />
            <div
                id="packages"
                className="flex flex-col items-center justify-center min-h-screen bg-topography"
            >
                <PricingPackages />
            </div>
        </ThemeProvider>
    );
}
