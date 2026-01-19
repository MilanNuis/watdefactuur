import {
    LayoutDashboard,
    Users,
    Package,
    FileText,
    Settings,
    LogIn,
    LogOut,
    User,
} from "lucide-react";

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

const mainItems = [
    {
        title: "Dashboard",
        url: route('pro.dashboard.index'),
        routeName: 'pro.dashboard.index',
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
        url: "/producten",
        icon: Package,
    },
    {
        title: "Facturen",
        url: "/facturen",
        icon: FileText,
    },
];

const settingsItems = [
    {
        title: "Instellingen",
        url: "/instellingen",
        icon: Settings,
    },
];

export function AppSidebar({ isAuthenticated = false }) {
    const isActive = (item: { url: string; routeName?: string }) => {
        const currentPath = window.location.pathname;
        if (item.routeName) {
            return route().current(item.routeName);
        }
        return currentPath === item.url || currentPath.startsWith(item.url + '/');
    };

    return (
        <Sidebar>
            <SidebarContent>
                {/* Header with logo */}
                <SidebarHeader className="border-b px-4 py-3">
                    <div className="flex items-center gap-3">
                        {/* Logo */}
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                            W
                        </div>

                        {/* App name */}
                        <span className="text-lg font-semibold tracking-tight">
                            WatDeFactuur
                        </span>
                    </div>
                </SidebarHeader>

                {/* Dashboard */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive(item)}>
                                        <a
                                            href={item.url}
                                            className="flex items-center gap-3"
                                        >
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
                                        <a
                                            href={item.url}
                                            className="flex items-center gap-3"
                                        >
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
                                        <a
                                            href={item.url}
                                            className="flex items-center gap-3"
                                        >
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
                        <SidebarMenuButton asChild>
                            <a
                                href="/account"
                                className="flex items-center gap-3"
                            >
                                <User className="h-4 w-4" />
                                <span>Account</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Auth */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            {isAuthenticated ? (
                                <a
                                    href="/logout"
                                    className="flex items-center gap-3 text-red-500"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Uitloggen</span>
                                </a>
                            ) : (
                                <a
                                    href="/login"
                                    className="flex items-center gap-3"
                                >
                                    <LogIn className="h-4 w-4" />
                                    <span>Inloggen</span>
                                </a>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
