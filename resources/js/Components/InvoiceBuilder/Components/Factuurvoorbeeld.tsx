import { InvoiceData } from "../types/InvoiceTypes";
// import { format } from "date-fns";

export default function Factuurvoorbeeld({ data }: { data: InvoiceData }) {
    return (
        <div className="bg-card rounded-xl invoice-shadow p-6 md:p-8 min-h-[600px]" id="invoice-preview">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    {data.company.logo ? (
                        <img src={data.company.logo} alt="Logo" className="w-24 h-24 object-contain mb-4" />
                    ) : (
                        <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mb-4">
                            <span className="text-muted-foreground text-xs">Logo</span>
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-foreground">{data.company.name || "Jouw Bedrijf"}</h1>
                    {data.company.address && <p className="text-sm text-muted-foreground">{data.company.address}</p>}
                    {(data.company.postalCode || data.company.city) && (
                        <p className="text-sm text-muted-foreground">
                            {data.company.postalCode} {data.company.city}
                        </p>
                    )}
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold text-primary mb-2">FACTUUR</h2>
                    <p className="text-sm text-muted-foreground">
                        Nr: <span className="font-medium text-foreground">{data.invoiceNumber || "-"}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Datum:{" "}
                        <span className="font-medium text-foreground">{/* {formatDate(data.invoiceDate)} */}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Vervaldatum:{" "}
                        <span className="font-medium text-foreground">{/* {formatDate(data.dueDate)} */}</span>
                    </p>
                </div>
            </div>

            {/* Client Info */}
            <div className="mb-8 p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Factuur aan</p>
                <p className="font-semibold text-foreground">{data.client.name || "Klantnaam"}</p>
                {data.client.address && <p className="text-sm text-muted-foreground">{data.client.address}</p>}
                {(data.client.postalCode || data.client.city) && (
                    <p className="text-sm text-muted-foreground">
                        {data.client.postalCode} {data.client.city}
                    </p>
                )}
                {data.client.email && <p className="text-sm text-muted-foreground">{data.client.email}</p>}
            </div>

            {/* Products Table */}
            <div className="mb-8">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-[#3C7144]">
                            <th className="text-left py-3 text-sm font-semibold text-foreground">Omschrijving</th>
                            <th className="text-center py-3 text-sm font-semibold text-foreground w-20">Aantal</th>
                            <th className="text-right py-3 text-sm font-semibold text-foreground w-28">Prijs</th>
                            <th className="text-right py-3 text-sm font-semibold text-foreground w-28">Totaal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-muted-foreground text-sm ">
                                    Geen producten toegevoegd
                                </td>
                            </tr>
                        ) : (
                            data.products.map((product) => (
                                <tr key={product.id} className="border-b border-border">
                                    <td className="py-3 text-sm text-foreground">
                                        {product.description || "Geen omschrijving"}
                                    </td>
                                    <td className="py-3 text-sm text-center text-muted-foreground">
                                        {product.quantity}
                                    </td>
                                    <td className="py-3 text-sm text-right text-muted-foreground">
                                        {/* {formatCurrency(product.unitPrice)} */}
                                    </td>
                                    <td className="py-3 text-sm text-right font-medium text-foreground">
                                        {/* {formatCurrency(product.quantity * product.unitPrice)} */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
                <div className="w-64">
                    <div className="flex justify-between py-2 text-sm">
                        <span className="text-muted-foreground">Subtotaal</span>
                        <span className="text-foreground">{/* {formatCurrency(subtotal)} */}</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm border-b border-border">
                        <span className="text-muted-foreground">BTW (21%)</span>
                        <span className="text-foreground">{/* {formatCurrency(btw)} */}</span>
                    </div>
                    <div className="flex justify-between py-3">
                        <span className="font-semibold text-foreground">Totaal</span>
                        <span className="font-bold text-lg text-primary">{/* {formatCurrency(total)} */}</span>
                    </div>
                </div>
            </div>

            {/* Notes */}
            {data.notes && (
                <div className="mb-8 p-4 bg-accent/50 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Opmerkingen</p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{data.notes}</p>
                </div>
            )}

            {/* Footer */}
            <div className="border-t border-border pt-4 text-center text-xs text-muted-foreground space-y-1">
                {data.company.email && <p>E-mail: {data.company.email}</p>}
                {data.company.phone && <p>Tel: {data.company.phone}</p>}
                {data.company.kvkNumber && <p>KVK: {data.company.kvkNumber}</p>}
                {data.company.btwNumber && <p>BTW: {data.company.btwNumber}</p>}
                {data.company.iban && <p>IBAN: {data.company.iban}</p>}
            </div>
        </div>
    );
}
