import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState, useMemo } from "react";

const TAX_BRACKETS_2026 = [
    { min: 0, max: 38441, rate: 0.3697 },
    { min: 38441, max: Infinity, rate: 0.495 },
];

const GENERAL_TAX_CREDIT = 3362;
const LABOR_TAX_CREDIT = 5532;

function calculateIncomeTax(income: number): {
    tax: number;
    effectiveRate: number;
    breakdown: { bracket: string; amount: number }[];
} {
    let remaining = income;
    let totalTax = 0;
    const breakdown: { bracket: string; amount: number }[] = [];

    for (const bracket of TAX_BRACKETS_2026) {
        if (remaining <= 0) break;
        const taxable = Math.min(remaining, bracket.max - bracket.min);
        const tax = taxable * bracket.rate;
        totalTax += tax;
        breakdown.push({
            bracket:
                bracket.max === Infinity
                    ? `Boven €${bracket.min.toLocaleString("nl-NL")}`
                    : `€${bracket.min.toLocaleString("nl-NL")} – €${bracket.max.toLocaleString("nl-NL")}`,
            amount: tax,
        });
        remaining -= taxable;
    }

    const credits = Math.min(totalTax, GENERAL_TAX_CREDIT + LABOR_TAX_CREDIT);
    totalTax = Math.max(0, totalTax - credits);

    return {
        tax: totalTax,
        effectiveRate: income > 0 ? (totalTax / income) * 100 : 0,
        breakdown,
    };
}

export default function IncomeTax() {
    const [brutoIncome, setBrutoIncome] = useState<string>("");
    const [aftrekKosten, setAftrekKosten] = useState<string>("");

    const currentYear = new Date().getFullYear();

    const taxResult = useMemo(() => {
        const income = parseFloat(brutoIncome) || 0;
        const ded = parseFloat(aftrekKosten) || 0;
        return calculateIncomeTax(Math.max(0, income - ded));
    }, [brutoIncome, aftrekKosten]);

    const belastbaarInkomen = Math.max(0, (parseFloat(brutoIncome) || 0) - (parseFloat(aftrekKosten) || 0));

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Gegevens invoeren</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bruto-income">Bruto jaarinkomen (€)</Label>
                        <Input
                            id="bruto-income"
                            placeholder="bv. 45000"
                            type="number"
                            value={brutoIncome}
                            onChange={(e) => setBrutoIncome(e.target.value)}
                            min="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aftrek-kosten">Aftrekposten (€)</Label>
                        <Input
                            placeholder="bv. 5000"
                            type="number"
                            id="aftrek-kosten"
                            value={aftrekKosten}
                            onChange={(e) => setAftrekKosten(e.target.value)}
                            min="0"
                        />
                        <p className="text-xs text-muted-foreground">
                            Zelfstandigenaftrek, startersaftrek, MKB-winstvrijstelling, etc.
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Resultaat {currentYear}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex justify-between border-b py-2">
                            <span className="text-muted-foreground">Belastbaar inkomen</span>
                            <span className="font-medium">
                                €
                                {belastbaarInkomen.toLocaleString("nl-NL", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        {taxResult.breakdown.map((b, i) => (
                            <div key={i} className="flex justify-between py-1 text-sm">
                                <span className="text-muted-foreground">{b.bracket}</span>
                                <span>
                                    €
                                    {b.amount.toLocaleString("nl-NL", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        ))}

                        <div className="flex justify-between border-t py-1 text-sm">
                            <span className="text-muted-foreground">Heffingskortingen</span>
                            <span className="text-primary">
                                -€
                                {Math.min(
                                    taxResult.breakdown.reduce((s, b) => s + b.amount, 0),
                                    GENERAL_TAX_CREDIT + LABOR_TAX_CREDIT,
                                ).toLocaleString("nl-NL", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div className="flex justify-between border-t py-2 text-lg font-bold">
                            <span>Te betalen</span>
                            <span>
                                €
                                {taxResult.tax.toLocaleString("nl-NL", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Effectief tarief</span>
                            <span>{taxResult.effectiveRate.toFixed(1)}%</span>
                        </div>
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                        * Indicatieve berekening op basis van belastingtarieven {currentYear}. Raadpleeg een
                        belastingadviseur voor exacte berekeningen.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
