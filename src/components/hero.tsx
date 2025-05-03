import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {
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
        <div className="bg-topography">
            <div
                id="home"
                className="pt-16 container mx-auto px-4 py-24 md:px-6 lg:py-56 2xl:max-w-[1400px]"
            >
                <div className="flex justify-center">
                    <p className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition">
                        NetCare release - Join now
                        <span className="bg-muted-foreground bg-opacity-15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-semibold">
                            <Link to="/register">
                                <svg
                                    className="h-4 w-4 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <title>NetCare</title>
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </Link>
                        </span>
                    </p>
                </div>
                <div className="mx-auto mt-5 max-w-2xl text-center">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Let&apos;s Join Now
                    </h1>
                </div>
                <div className="mx-auto mt-5 max-w-3xl text-center">
                    <p className="text-muted-foreground text-xl">
                        NetCare is a platform that provides a wide range of
                        packages and transactions to help you manage your needs
                        effectively. Join us now and experience the convenience
                        of our services.
                    </p>
                </div>
                <div className="mt-8 flex justify-center gap-3">
                    <Button size={"lg"} onClick={() => navigate("/register")}>
                        Get started
                    </Button>
                    <Button
                        size={"lg"}
                        variant={"outline"}
                        onClick={() => handleScrollToSection("packages")}
                    >
                        See our packages
                    </Button>
                </div>
            </div>
        </div>
    );
}
