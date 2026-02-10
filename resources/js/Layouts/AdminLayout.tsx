import { AdminSidebar } from "@/Components/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/Components/ui/sidebar";
import { Toaster } from "@/Components/ui/sonner";
import FlashHandler from "@/Handlers/Toaster";

export default function Adminlayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset className="bg-gray-50">
                <section className="p-4">
                    <Toaster position="top-center" richColors />
                    <FlashHandler />
                    {children}
                </section>
            </SidebarInset>
        </SidebarProvider>
    );
}
