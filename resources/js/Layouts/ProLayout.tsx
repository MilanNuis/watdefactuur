import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
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
