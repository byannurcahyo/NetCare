import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    IconChartBar,
    IconDashboard,
    IconListDetails,
    IconUsers,
} from "@tabler/icons-react";
import { Link } from "react-router";

export function NavMain() {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link to="/dashboard">
                            <SidebarMenuButton tooltip="Dashboard">
                                <IconDashboard />
                                <span>Dashboard</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link to="/packages">
                            <SidebarMenuButton tooltip="Packages">
                                <IconListDetails />
                                <span>Packages</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link to="/transactions">
                            <SidebarMenuButton tooltip="Transactions">
                                <IconChartBar />
                                <span>Transactions</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link to="/users">
                            <SidebarMenuButton tooltip="Users">
                                <IconUsers />
                                <span>Users</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
