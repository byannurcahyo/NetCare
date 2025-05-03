import topographySvg from "@/assets/topography.svg";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/contexts/SessionContext";
import { loginUser } from "@/lib/api/auth";
import { LOGIN_USER_SCHEMA } from "@/lib/schemas/user.schema";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useSession();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        try {
            await LOGIN_USER_SCHEMA.parseAsync(data);
            const user = await loginUser({
                email: data.email as string,
                password: data.password as string,
            });
            setUser(user);
            toast.success("Login successfully!", {
                description: "You have successfully login.",
                position: "bottom-right",
                duration: 3000,
                className: "!bg-green-500 text-white !border-none !shadow-lg",
            });
            setTimeout(() => {
                const savedUser = JSON.parse(
                    localStorage.getItem("user") ?? "{}",
                );
                const role = savedUser.role;

                if (role === "admin") {
                    navigate("/dashboard", { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            }, 3000);
        } catch {
            toast.error("Login Failed", {
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
                                        Welcome back
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account
                                    </p>
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
                                    Login
                                </Button>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="hover:underline underline-offset-4"
                                    >
                                        Register
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
                    </span>
                    {" and "}
                    <span className="font-semibold hover:underline">
                        Privacy Policy
                    </span>
                    {"."}
                </div>
            </div>
        </ThemeProvider>
    );
}
