import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TransactionTable } from "@/components/transaction-table";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Transactions() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-6 h-screen px-8 py-8">
                                <div className="rounded-2xl bg-zinc-900 p-8">
                                    <div className="rounded-lg border">
                                        <TransactionTable />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
