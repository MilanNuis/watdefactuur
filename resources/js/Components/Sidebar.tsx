import { LayoutDashboard, Users, Package, FileText, Settings, LogIn, LogOut, User, Percent } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";

const mainItems = [
    {
        title: "Dashboard",
        url: route("pro.dashboard.index"),
        routeName: "pro.dashboard.index",
        icon: LayoutDashboard,
    },
];

const adminItems = [
    {
        title: "Klanten",
        url: route("pro.dashboard.customers.index"),
        routeName: "pro.dashboard.customers.index",
        icon: Users,
    },
    {
        title: "Producten",
        url: route("pro.dashboard.products.index"),
        routeName: "pro.dashboard.products.index",
        icon: Package,
    },
    {
        title: "Facturen",
        url: route("pro.dashboard.invoices.index"),
        routeName: "pro.dashboard.invoices.index",
        icon: FileText,
    },
    {
        title: "Belastingen",
        url: route("pro.dashboard.taxes.index"),
        routeName: "pro.dashboard.taxes.index",
        icon: Percent,
    },
];

const settingsItems = [
    {
        title: "Instellingen",
        url: route("pro.dashboard.settings.index"),
        routeName: "pro.dashboard.settings.index",
        icon: Settings,
    },
];

export function AppSidebar() {
    const isActive = (item: { url: string; routeName?: string }) => {
        const currentPath = window.location.pathname;
        if (item.routeName) {
            return route().current(item.routeName);
        }
        return currentPath === item.url || currentPath.startsWith(item.url + "/");
    };

    const isAuthenticated = usePage().props.auth.user;

    console.log(isAuthenticated);

    return (
        <Sidebar>
            <SidebarContent>
                {/* Header with logo */}
                <SidebarHeader className="border-b px-4 py-3">
                    <div className="flex items-center gap-3">
                        {/* <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                            W
                        </div>

                        <span className="text-lg font-semibold tracking-tight">
                            WatDeFactuur
                        </span> */}
                        <Link href={route("home")}>
                            <img src="/logos/ProLogo.svg" alt="" />
                        </Link>
                    </div>
                </SidebarHeader>

                {/* Dashboard */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive(item)}>
                                        <a href={item.url} className="flex items-center gap-3">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Administratie */}
                <SidebarGroup>
                    <SidebarGroupLabel>Administratie</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive(item)}>
                                        <a href={item.url} className="flex items-center gap-3">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Settings */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {settingsItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive(item)}>
                                        <a href={item.url} className="flex items-center gap-3">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer / Account */}
            <SidebarFooter className="border-t p-3">
                <SidebarMenu>
                    {/* Account */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={route().current("pro.dashboard.account.index")}>
                            <Link href={route("pro.dashboard.account.index")} className="flex items-center gap-3">
                                <User className="h-4 w-4" />
                                <span>Account</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Auth */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            {isAuthenticated ? (
                                <Link
                                    href={route("logout")}
                                    as="button"
                                    method="post"
                                    className="flex items-center gap-3 text-red-500"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Uitloggen</span>
                                </Link>
                            ) : (
                                <Link href={route("login")} className="flex items-center gap-3">
                                    <LogIn className="h-4 w-4" />
                                    <span>Inloggen</span>
                                </Link>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
