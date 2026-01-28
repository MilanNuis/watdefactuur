import { InvoiceData } from "../types/InvoiceTypes";
// import { format } from "date-fns";

interface Props {
    Preview: string | null;
    data: InvoiceData;
}

export default function Factuurvoorbeeld({ data, Preview }: Props) {
    const subtotal = data.products.reduce(
        (sum, product) => sum + product.quantity * product.unitPrice,
        0,
    );
    const btwTotal = data.products.reduce(
        (sum, product) =>
            sum + product.quantity * product.unitPrice * (product.btw / 100),
        0,
    );
    const total = subtotal + btwTotal;

    return (
        <div
            className="bg-card border-2 border-[--main-green]  rounded-xl invoice-shadow p-6 md:p-8 w-auto"
            id="invoice-preview"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                <div>
                    {Preview ? (
                        <img
                            src={Preview}
                            alt="Logo"
                            className="w-20 h-20 md:w-24 md:h-24 object-contain mb-4"
                        />
                    ) : (
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-lg flex items-center justify-center mb-4">
                            <span className="text-muted-foreground text-xs">
                                Logo
                            </span>
                        </div>
                    )}
                    <h1 className="text-xl md:text-2xl font-bold text-foreground">
                        {data.company.name || "Jouw Bedrijf"}
                    </h1>
                    {data.company.address && (
                        <p className="text-sm text-muted-foreground">
                            {data.company.address}
                        </p>
                    )}
                    {(data.company.postalCode || data.company.city) && (
                        <p className="text-sm text-muted-foreground">
                            {data.company.postalCode} {data.company.city}
                        </p>
                    )}
                </div>
                <div className="sm:text-right w-full sm:w-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        FACTUUR
                    </h2>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                            Nr:{" "}
                            <span className="font-medium text-foreground">
                                {data.invoiceNumber || "-"}
                            </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Datum:{" "}
                            <span className="font-medium text-foreground">
                                {data.invoiceDate}
                            </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Vervaldatum:{" "}
                            <span className="font-medium text-foreground">
                                {data.dueDate}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Client Info */}
            <div className="mb-8 p-4  rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Factuur aan
                </p>
                <p className="font-semibold text-foreground">
                    {data.client.name || "Klantnaam"}
                </p>
                {data.client.address && (
                    <p className="text-sm text-muted-foreground">
                        {data.client.address}
                    </p>
                )}
                {(data.client.postalCode || data.client.city) && (
                    <p className="text-sm text-muted-foreground">
                        {data.client.postalCode} {data.client.city}
                    </p>
                )}
                {data.client.email && (
                    <p className="text-sm text-muted-foreground">
                        {data.client.email}
                    </p>
                )}
            </div>

            {/* Products Table */}
            <div className="mb-8 overflow-x-auto">
                <table className="w-full min-w-[500px]">
                    <thead>
                        <tr className="border-b-2 border-[#1D1D1B]">
                            <th className="text-left py-3 text-sm font-semibold text-foreground">
                                Omschrijving
                            </th>
                            <th className="text-center py-3 text-sm font-semibold text-foreground w-20">
                                Aantal
                            </th>
                            <th className="text-right py-3 text-sm font-semibold text-foreground w-28">
                                Prijs
                            </th>
                            <th className="text-right py-3 text-sm font-semibold text-foreground w-28">
                                BTW
                            </th>
                            <th className="text-right py-3 text-sm font-semibold text-foreground w-28">
                                Totaal excl. BTW
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="py-8 text-center text-muted-foreground text-sm "
                                >
                                    Geen producten toegevoegd
                                </td>
                            </tr>
                        ) : (
                            data.products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-border"
                                >
                                    <td className="py-3 text-sm text-foreground">
                                        {product.description ||
                                            "Geen omschrijving"}
                                    </td>
                                    <td className="py-3 text-sm text-center text-muted-foreground">
                                        {product.quantity}
                                    </td>
                                    <td className="py-3 text-sm text-right text-muted-foreground">
                                        {product.unitPrice.toFixed(2)}
                                    </td>
                                    <td className="py-3 text-sm text-right text-muted-foreground">
                                        {product.btw.toFixed(2)}%
                                    </td>
                                    <td className="py-3 text-sm text-right font-medium text-foreground">
                                        {(
                                            product.quantity * product.unitPrice
                                        ).toFixed(2)}
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
                        <span className="text-foreground">
                            {subtotal.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between py-2 text-sm border-b border-border">
                        <span className="text-muted-foreground">BTW</span>
                        <span className="text-foreground">
                            {btwTotal.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between py-3">
                        <span className="font-semibold text-foreground">
                            Totaal
                        </span>
                        <span className="font-bold text-lg text-primary">
                            {total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Notes */}
            {data.notes && (
                <div className="mb-8 p-4  rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                        Opmerkingen
                    </p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                        {data.notes}
                    </p>
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
            <div className=" flex justify-center">
                <img src="logos/LogoGreen.svg" alt="watdefactuur" />
            </div>
        </div>
    );
}
