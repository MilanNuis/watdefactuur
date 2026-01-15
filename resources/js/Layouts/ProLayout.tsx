import { AppSidebar } from "@/Components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { FileText } from "lucide-react";

export default function ProLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
