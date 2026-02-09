import Header from "@/Components/Pro/Header";
import ProLayout from "@/Layouts/ProLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/Badge";
import { Button } from "@/Components/ui/button";
import Paginator from "@/Components/Paginator";
import { Eye, Calendar, User, Mail, Phone, MapPin, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { InvoiceType } from "@/types/invoice";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface invoicesProps {
    invoices: {
        data: InvoiceType[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
    };
}

export default function Index() {
    const { invoices } = usePage().props as unknown as invoicesProps;
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType | null>(
        null,
    );

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
        }).format(amount);
    };

    const handleStatusChange = (invoiceId: string, newStatus: string) => {
        router.patch(
            route("pro.dashboard.invoices.update-status", { invoice: invoiceId }),
            { status: newStatus },
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (selectedInvoice && selectedInvoice.id === invoiceId) {
                        setSelectedInvoice({
                            ...selectedInvoice,
                            status: newStatus
                        });
                    }
                },
            },
        );
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "betaald":
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                        Betaald
                    </Badge>
                );
            case "openstaand":
                return (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Openstaand
                    </Badge>
                );
            case "overtijd":
                return (
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                        Overtijd
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <ProLayout>
            <Header title="Facturen" description="Beheer hier je facturen" />

            <div className="mt-8 bg-card rounded-xl border border-border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Factuurnummer</TableHead>
                            <TableHead>Klant</TableHead>
                            <TableHead>Datum</TableHead>
                            <TableHead>Totaal</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Acties</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    Geen facturen gevonden.
                                </TableCell>
                            </TableRow>
                        ) : (
                            invoices.data.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">
                                        {invoice.invoice_number}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.client_first_name}{" "}
                                        {invoice.client_last_name}
                                    </TableCell>
                                    <TableCell>{invoice.invoice_date}</TableCell>
                                    <TableCell>
                                        {formatCurrency(invoice.total)}
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={invoice.status.toLowerCase()}
                                            onValueChange={(value) =>
                                                handleStatusChange(
                                                    invoice.id,
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-[140px] h-8">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="openstaand">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-blue-500" />
                                                        <span>Openstaand</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="betaald">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                        <span>Betaald</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="overtijd">
                                                    <div className="flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                                        <span>Overtijd</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setSelectedInvoice(invoice)
                                            }
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Paginator data={invoices} />

            <Dialog
                open={!!selectedInvoice}
                onOpenChange={(open) => !open && setSelectedInvoice(null)}
            >
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    {selectedInvoice && (
                        <>
                            <DialogHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <DialogTitle className="text-2xl">
                                            Factuur{" "}
                                            {selectedInvoice.invoice_number}
                                        </DialogTitle>
                                        <DialogDescription>
                                            Details van de geselecteerde factuur
                                        </DialogDescription>
                                    </div>
                                    <div className="text-right">
                                        <Select
                                            defaultValue={selectedInvoice.status.toLowerCase()}
                                            onValueChange={(value) =>
                                                handleStatusChange(
                                                    selectedInvoice.id,
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-[140px] h-8">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="openstaand">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-blue-500" />
                                                        <span>Openstaand</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="betaald">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                        <span>Betaald</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="overtijd">
                                                    <div className="flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                                        <span>Overtijd</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </DialogHeader>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Klantgegevens
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <p className="font-medium text-base">
                                            {selectedInvoice.client_first_name}{" "}
                                            {selectedInvoice.client_last_name}
                                        </p>
                                        <p className="flex items-center gap-2 text-muted-foreground">
                                            <Mail className="w-4 h-4" />
                                            {selectedInvoice.client_email}
                                        </p>
                                        {selectedInvoice.client_phone && (
                                            <p className="flex items-center gap-2 text-muted-foreground">
                                                <Phone className="w-4 h-4" />
                                                {selectedInvoice.client_phone}
                                            </p>
                                        )}
                                        <p className="flex items-start gap-2 text-muted-foreground">
                                            <MapPin className="w-4 h-4 mt-0.5" />
                                            <span>
                                                {selectedInvoice.client_street}{" "}
                                                {
                                                    selectedInvoice.client_house_number
                                                }
                                                <br />
                                                {
                                                    selectedInvoice.client_postalcode
                                                }{" "}
                                                {selectedInvoice.client_city}
                                                <br />
                                                {selectedInvoice.client_country}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Data
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                Factuurdatum:
                                            </span>
                                            <span className="font-medium">
                                                {selectedInvoice.invoice_date}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                Vervaldatum:
                                            </span>
                                            <span className="font-medium">
                                                {selectedInvoice.due_date}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                Aangemaakt op:
                                            </span>
                                            <span className="font-medium text-xs">
                                                {new Date(
                                                    selectedInvoice.created_at,
                                                ).toLocaleString("nl-NL")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-semibold mb-3">
                                    Producten / Diensten
                                </h3>
                                <div className="border rounded-lg overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-muted/50">
                                            <TableRow>
                                                <TableHead>
                                                    Omschrijving
                                                </TableHead>
                                                <TableHead className="text-center">
                                                    Aantal
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Prijs
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    BTW
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Totaal
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selectedInvoice.products.map(
                                                (product, idx) => (
                                                    <TableRow key={idx}>
                                                        <TableCell>
                                                            {product.description ||
                                                                product.name}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {product.quantity}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {formatCurrency(
                                                                product.unitPrice,
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {product.btw}%
                                                        </TableCell>
                                                        <TableCell className="text-right font-medium">
                                                            {formatCurrency(
                                                                product.quantity *
                                                                    product.unitPrice,
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ),
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <div className="w-full md:w-64 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Subtotaal:
                                        </span>
                                        <span>
                                            {formatCurrency(
                                                selectedInvoice.subtotal,
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            BTW totaal:
                                        </span>
                                        <span>
                                            {formatCurrency(
                                                selectedInvoice.btw_total,
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t font-bold text-lg">
                                        <span>Totaal:</span>
                                        <span className="text-primary">
                                            {formatCurrency(
                                                selectedInvoice.total,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </ProLayout>
    );
}
