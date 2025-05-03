import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getPackages } from "@/lib/api/packages";
import { createTransaction } from "@/lib/api/transaction";
import { CREATE_TRANSACTION_SCHEMA } from "@/lib/schemas/transaction.schema";
import type { Package } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { z } from "zod";

export default function PricingPackages() {
    const navigate = useNavigate();
    const [packages, setPackages] = useState<Package[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(
        null,
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingPackages, setIsLoadingPackages] = useState(true);

    const form = useForm<z.infer<typeof CREATE_TRANSACTION_SCHEMA>>({
        resolver: zodResolver(CREATE_TRANSACTION_SCHEMA),
        defaultValues: {
            userId: "",
            fullName: "",
            phoneNumber: "",
            packageId: "",
            packageName: "",
            price: 0,
            status: "pending",
            date: new Date().toISOString(),
        },
    });

    const handleCreate = (pkg: Package) => {
        try {
            const user = localStorage.getItem("user");
            if (!user) {
                toast.error("Please login first", {
                    description: "You need to be logged in to make a purchase",
                    position: "bottom-right",
                    duration: 3000,
                });
                navigate("/login");
                return;
            }
            const parsedUser = JSON.parse(user);
            if (!parsedUser?.id || !parsedUser?.fullName) {
                toast.error("Invalid user data", {
                    description: "Please login again",
                    position: "bottom-right",
                });
                navigate("/login");
                return;
            }
            setSelectedPackage(pkg);
            setIsDialogOpen(true);
        } catch (error) {
            console.error("Error parsing user data:", error);
            toast.error("Session error", {
                description: "Please login again",
                position: "bottom-right",
            });
            navigate("/login");
        }
    };

    useEffect(() => {
        const fetchPackages = async () => {
            setIsLoadingPackages(true);
            try {
                const fetchedData = await getPackages();
                if (fetchedData) {
                    setPackages(fetchedData);
                }
            } catch (error) {
                console.error("Error fetching packages:", error);
                toast.error("Failed to load packages", {
                    description: "Please try again later",
                    position: "bottom-right",
                });
            } finally {
                setIsLoadingPackages(false);
            }
        };
        fetchPackages();
    }, []);

    useEffect(() => {
        if (selectedPackage) {
            try {
                const user = JSON.parse(localStorage.getItem("user") ?? "{}");
                form.reset({
                    userId: user.id ?? "",
                    fullName: user.fullName ?? "",
                    phoneNumber: "",
                    packageId: selectedPackage.id,
                    packageName: selectedPackage.name,
                    price: selectedPackage.price,
                    status: "pending",
                    date: new Date().toISOString(),
                });
            } catch (error) {
                console.error("Error resetting form:", error);
                toast.error("Form error", {
                    description: "Please try again",
                    position: "bottom-right",
                });
            }
        }
    }, [selectedPackage, form]);

    const onSubmit = async (
        data: z.infer<typeof CREATE_TRANSACTION_SCHEMA>,
    ) => {
        if (!selectedPackage) return;
        setIsSubmitting(true);
        try {
            const savedUser = JSON.parse(localStorage.getItem("user") ?? "{}");
            if (!savedUser.id || !savedUser.fullName) {
                toast.error("Invalid user data", {
                    description: "Please login again",
                    position: "bottom-right",
                });
                navigate("/login");
                return;
            }
            if (!data.phoneNumber || data.phoneNumber.length < 10) {
                toast.error("Invalid phone number", {
                    description: "Please enter a valid phone number",
                    position: "bottom-right",
                });
                return;
            }
            const transactionData = {
                userId: savedUser.id,
                fullName: savedUser.fullName,
                phoneNumber: data.phoneNumber,
                packageId: selectedPackage.id,
                packageName: selectedPackage.name,
                price: selectedPackage.price,
                status: "pending",
                date: new Date().toISOString(),
            };
            await createTransaction(transactionData);
            toast.success("Transaction created successfully!", {
                description: "Your transaction is being processed.",
                position: "bottom-right",
                duration: 3000,
                className: "!bg-green-500 text-white !border-none !shadow-lg",
            });
        } catch {
            toast.error("Failed to create transaction", {
                description: " Please try again later.",
                position: "bottom-right",
                duration: 3000,
                className: "!bg-red-500 text-white !border-none !shadow-lg",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-24 justify-center items-center">
                <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <h2 className="scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0">
                        Pricing Packages
                    </h2>
                    <p className="mt-1 text-xl text-muted-foreground">
                        Choose your package and enjoy the benefits of our
                        service.
                    </p>
                </div>
                {isLoadingPackages ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : (
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
                        {packages.map((pkg) => (
                            <Card key={pkg.id} className="flex flex-col">
                                <CardHeader className="text-center pb-2">
                                    <CardTitle className="mb-7">
                                        {pkg.name}
                                    </CardTitle>
                                    <span className="font-bold text-5xl">
                                        {Math.floor(pkg.price / 1000)}k
                                    </span>
                                </CardHeader>
                                <CardDescription className="text-center">
                                    {pkg.description}
                                </CardDescription>
                                <CardContent className="flex-1">
                                    <ul className="mt-7 space-y-2.5 text-sm">
                                        <li className="flex space-x-2">
                                            <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                                            <span className="text-muted-foreground">
                                                {pkg.data} Data
                                            </span>
                                        </li>
                                        <li className="flex space-x-2">
                                            <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                                            <span className="text-muted-foreground">
                                                {pkg.duration}
                                            </span>
                                        </li>
                                        <li className="flex space-x-2">
                                            <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                                            <span className="text-muted-foreground">
                                                {pkg.bonus}
                                            </span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        variant={"outline"}
                                        onClick={() => handleCreate(pkg)}
                                    >
                                        Beli Sekarang
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create Transaction</DialogTitle>
                        <DialogDescription>
                            Fill in the form below to create a new transaction.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="packageName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Package</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
                                                value={`Rp ${field.value.toLocaleString()}`}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="081234567890"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        form.reset();
                                        setIsDialogOpen(false);
                                    }}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Complete Purchase"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
