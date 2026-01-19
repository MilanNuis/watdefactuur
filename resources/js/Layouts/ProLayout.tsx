import { AppSidebar } from "@/Components/Sidebar";
import { SidebarProvider, SidebarInset } from "@/Components/ui/sidebar";
import { Toaster } from "@/Components/ui/sonner";
import FlashHandler from "@/Handlers/Toaster";

export default function ProLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="p-4">
                <Toaster position="top-center" richColors />
                <FlashHandler />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
