import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import FuzzyText from "@/components/ui/fuzzy-text";

export default function NotFound() {
    return (
        <ThemeProvider defaultTheme="dark">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-6xl font-bold">
                    <FuzzyText
                        baseIntensity={0.2}
                        hoverIntensity={0.5}
                        enableHover={true}
                    >
                        404
                    </FuzzyText>
                </div>
                <h1 className="mt-4 text-2xl font-semibold">Page Not Found</h1>
                <p className="mb-6">
                    The page you are looking for does not exist.
                </p>
                <Button className="px-8" onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </div>
        </ThemeProvider>
    );
}
