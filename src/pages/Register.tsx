import topographySvg from "@/assets/topography.svg";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/api/auth";
import { REGISTER_USER_SCHEMA } from "@/lib/schemas/user.schema";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        try {
            await REGISTER_USER_SCHEMA.parseAsync(data);
            await registerUser({
                fullName: data.fullName as string,
                email: data.email as string,
                password: data.password as string,
            });
            toast.success("Register successfully!", {
                description: "You have successfully register.",
                position: "bottom-right",
                duration: 3000,
                className: "!bg-green-500 text-white !border-none !shadow-lg",
            });
            navigate("/login", { replace: true });
        } catch {
            toast.error("Register Failed", {
                description: "Please try again later.",
                position: "bottom-right",
                duration: 3000,
                className: "!bg-red-600 text-white !border-none !shadow-lg",
            });
        }
    };

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="flex flex-col gap-6 h-screen items-center justify-center bg-topography">
                <Card className="overflow-hidden p-0 sm:w-2xl">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Create your account
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="fullName">Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="mail@netcare.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="******"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="hover:underline underline-offset-4"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                        <div className="bg-muted relative hidden md:block">
                            <img
                                src={topographySvg}
                                alt="Login"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-zinc-900/40"
                            />
                        </div>
                    </CardContent>
                </Card>
                <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                    By clicking continue, you agree to our{" "}
                    <span className="font-semibold hover:underline">
                        Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold hover:underline">
                        Privacy Policy
                    </span>
                    .
                </div>
            </div>
        </ThemeProvider>
    );
}
