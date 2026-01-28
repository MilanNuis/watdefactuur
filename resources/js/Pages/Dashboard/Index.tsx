import Header from "@/Components/Pro/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import ProLayout from "@/Layouts/ProLayout";
import { usePage } from "@inertiajs/react";
import { FileText, Package, TrendingUp, Users } from "lucide-react";
import { InvoiceType } from "@/types/invoice";
import Customer from "@/Pages/Pro/Customers/types";
import { NumberTicker } from "@/Components/ui/number-ticker";

interface DashboardProps {
    recentInvoices: InvoiceType[];
    recentCustomers: Customer[];
    customerCount: number;
    productCount: number;
    invoiceCount: number;
    totalRevenue: number;
}

export default function Index() {
    const { recentInvoices, recentCustomers, customerCount, productCount, invoiceCount, totalRevenue } = usePage().props as unknown as DashboardProps;
    return (
        <ProLayout>
            <Header title="Overzicht" description="Overzicht van je bedrijf" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Klanten</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <NumberTicker value={customerCount} className="text-2xl font-bold" />
                        <p className="text-xs text-muted-foreground">Totaal aantal klanten</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Producten</CardTitle>
                        <Package className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <NumberTicker value={productCount} className="text-2xl font-bold" />
                        <p className="text-xs text-muted-foreground">Actieve producten</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Facturen</CardTitle>
                        <FileText className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <NumberTicker value={invoiceCount} className="text-2xl font-bold" />
                        <p className="text-xs text-muted-foreground">Totaal aantal facturen</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Omzet</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <NumberTicker value={totalRevenue} decimalPlaces={2} className="text-2xl font-bold" />
                        <p className="text-xs text-muted-foreground">Totaal omzet</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-4 mt-4">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle className="montserrat-main">Recente Facturen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentInvoices.length === 0 ? (
                                <p className="text-muted-foreground text-sm">Nog geen facturen aangemaakt.</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentInvoices.slice(0, 5).map((invoice) => (
                                        <div key={invoice.id} className="flex items-center justify-between py-2 border-b last:border-0">
                                            <div>
                                                <p className="font-medium">{invoice.invoice_number}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {invoice.client_first_name} {invoice.client_last_name}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">€{Number(invoice.total).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle className="montserrat-main">Recente Klanten</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentCustomers.length === 0 ? (
                                <p className="text-muted-foreground text-sm">Nog geen klanten toegevoegd.</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentCustomers.slice(0, 5).map((customer) => (
                                        <div key={customer.id} className="flex items-center justify-between py-2 border-b last:border-0">
                                            <div>
                                                <p className="font-medium">{customer.first_name} {customer.last_name}</p>
                                                <p className="text-sm text-muted-foreground">{customer.email}</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{customer.city}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ProLayout>
    );
}
