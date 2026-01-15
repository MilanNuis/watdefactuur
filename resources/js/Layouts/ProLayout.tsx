import { AppSidebar } from "@/Components/Sidebar";
import { SidebarProvider, SidebarInset } from "@/Components/ui/sidebar";

export default function ProLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="p-4">{children}</SidebarInset>
        </SidebarProvider>
    );
}
