import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { InvoiceType } from "@/types/invoice";
import { useState, useMemo } from "react";

interface VatTaxProps {
    invoices: InvoiceType[];
}

const BTW_RATE = 0.21;

function getQuarterDates(quarter: string, year: number) {
    const quarters: Record<string, { start: string; end: string }> = {
        Q1: { start: `${year}-01-01`, end: `${year}-03-31` },
        Q2: { start: `${year}-04-01`, end: `${year}-06-30` },
        Q3: { start: `${year}-07-01`, end: `${year}-09-30` },
        Q4: { start: `${year}-10-01`, end: `${year}-12-31` },
    };
    return quarters[quarter];
}

export default function VatTax({ invoices }: VatTaxProps) {
    const [selectedQuarter, setSelectedQuarter] = useState<string>("Q1");
    const [manualRevenue, setManualRevenue] = useState<string>("");
    const [manualExpenses, setManualExpenses] = useState<string>("");

    const currentYear = new Date().getFullYear();

    const vatResult = useMemo(() => {
        const dates = getQuarterDates(selectedQuarter, currentYear);

        const quarterInvoices = invoices.filter((inv) => {
            return (
                inv.invoice_date >= dates.start &&
                inv.invoice_date <= dates.end &&
                inv.status.toLowerCase() !== "draft"
            );
        });

        const invoiceRevenue = quarterInvoices.reduce(
            (sum, inv) => sum + inv.subtotal,
            0,
        );
        const invoiceBtw = quarterInvoices.reduce(
            (sum, inv) => sum + inv.btw_total,
            0,
        );

        const revenue = (parseFloat(manualRevenue) || 0) + invoiceRevenue;
        const expenses = parseFloat(manualExpenses) || 0;

        const btwOntvangen = invoiceBtw + (parseFloat(manualRevenue) || 0) * BTW_RATE;
        const btwBetaald = expenses * BTW_RATE;
        const btwAfdracht = btwOntvangen - btwBetaald;

        return {
            revenue,
            invoiceRevenue,
            expenses,
            btwOntvangen,
            btwBetaald,
            btwAfdracht,
            invoiceCount: quarterInvoices.length,
        };
    }, [selectedQuarter, invoices, manualRevenue, manualExpenses, currentYear]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Kwartaal selecteren</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Kwartaal</Label>
                        <Select
                            value={selectedQuarter}
                            onValueChange={setSelectedQuarter}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Q1">
                                    Q1 – Januari t/m Maart
                                </SelectItem>
                                <SelectItem value="Q2">
                                    Q2 – April t/m Juni
                                </SelectItem>
                                <SelectItem value="Q3">
                                    Q3 – Juli t/m September
                                </SelectItem>
                                <SelectItem value="Q4">
                                    Q4 – Oktober t/m December
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="manual-revenue">
                            Extra omzet excl. BTW (€)
                        </Label>
                        <Input
                            id="manual-revenue"
                            type="number"
                            placeholder="Naast facturen"
                            value={manualRevenue}
                            onChange={(e) => setManualRevenue(e.target.value)}
                            min="0"
                        />
                        <p className="text-xs text-muted-foreground">
                            Omzet die niet in je facturen staat
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="expenses">
                            Zakelijke kosten excl. BTW (€)
                        </Label>
                        <Input
                            id="expenses"
                            type="number"
                            placeholder="Bijv. 2500"
                            value={manualExpenses}
                            onChange={(e) => setManualExpenses(e.target.value)}
                            min="0"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        BTW-aangifte {selectedQuarter} {currentYear}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b text-sm">
                            <span className="text-muted-foreground">
                                Facturen in {selectedQuarter}
                            </span>
                            <span>{vatResult.invoiceCount} facturen</span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">
                                Totale omzet (excl. BTW)
                            </span>
                            <span className="font-medium">
                                €
                                {vatResult.revenue.toLocaleString("nl-NL", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div className="flex justify-between py-1 text-sm">
                            <span className="text-muted-foreground">
                                ↳ Uit facturen
                            </span>
                            <span>
                                €
                                {vatResult.invoiceRevenue.toLocaleString("nl-NL", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">
                                BTW ontvangen
                            </span>
                            <span>
                                €
                                {vatResult.btwOntvangen.toLocaleString("nl-NL", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">
                                Zakelijke kosten (excl. BTW)
                            </span>
                            <span>
                                €
                                {vatResult.expenses.toLocaleString("nl-NL", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">
                                BTW betaald (voorbelasting)
                            </span>
                            <span className="text-primary">
                                €
                                {vatResult.btwBetaald.toLocaleString("nl-NL", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div
                            className={`flex justify-between py-2 border-t text-lg font-bold ${
                                vatResult.btwAfdracht < 0 ? "text-primary" : ""
                            }`}
                        >
                            <span>
                                {vatResult.btwAfdracht >= 0
                                    ? "Af te dragen BTW"
                                    : "BTW teruggave"}
                            </span>
                            <span>
                                €
                                {Math.abs(vatResult.btwAfdracht).toLocaleString(
                                    "nl-NL",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    },
                                )}
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">
                        * Indicatieve berekening. Factuuromzet wordt automatisch
                        meegenomen. Raadpleeg een belastingadviseur voor exacte
                        aangiftes.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
