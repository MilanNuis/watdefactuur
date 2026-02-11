import { InvoiceData } from "../types/InvoiceTypes";
// import { format } from "date-fns";

interface Props {
    Preview: string | null;
    data: InvoiceData;
}

export default function Factuurvoorbeeld({ data, Preview }: Props) {
    const subtotal = data.products.reduce((sum, product) => sum + product.quantity * product.unitPrice, 0);
    const btwTotal = data.products.reduce(
        (sum, product) => sum + product.quantity * product.unitPrice * (product.btw / 100),
        0,
    );
    const total = subtotal + btwTotal;

    return (
        <div
            className="invoice-shadow montserrat-main w-auto rounded-xl border-2 border-[--main-green] bg-card p-6 font-montserrat md:p-8"
            id="invoice-preview"
        >
            {/* Header */}
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div>
                    {Preview ? (
                        <img src={Preview} alt="Logo" className="mb-4 h-20 w-20 object-contain md:h-24 md:w-24" />
                    ) : (
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-muted md:h-24 md:w-24">
                            <span className="text-xs text-muted-foreground">Logo</span>
                        </div>
                    )}
                    <h1 className="montserrat-main text-xl font-bold text-foreground md:text-2xl">
                        {data.company.name || "Jouw Bedrijf"}
                    </h1>
                    {data.company.address && <p className="text-sm text-muted-foreground">{data.company.address}</p>}
                    {(data.company.postalCode || data.company.city) && (
                        <p className="text-sm text-muted-foreground">
                            {data.company.postalCode} {data.company.city}
                        </p>
                    )}
                </div>
                <div className="w-full sm:w-auto sm:text-right">
                    <h2 className="montserrat-main mb-2 text-2xl font-bold text-primary md:text-3xl">FACTUUR</h2>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                            Nr: <span className="font-medium text-foreground">{data.invoiceNumber || "-"}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Datum: <span className="font-medium text-foreground">{data.invoiceDate}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Vervaldatum: <span className="font-medium text-foreground">{data.dueDate}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Client Info */}
            <div className="mb-8 rounded-lg p-4">
                <p className="montserrat-main mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Factuur aan
                </p>
                <p className="montserrat-main font-semibold text-foreground">{data.client.name || "Klantnaam"}</p>
                {data.client.address && <p className="text-sm text-muted-foreground">{data.client.address}</p>}
                {(data.client.postalCode || data.client.city) && (
                    <p className="text-sm text-muted-foreground">
                        {data.client.postalCode} {data.client.city}
                    </p>
                )}
                {data.client.email && <p className="text-sm text-muted-foreground">{data.client.email}</p>}
                {data.client.phone && <p className="text-sm text-muted-foreground">{data.client.phone}</p>}
            </div>

            {/* Products Table */}
            <div className="mb-8 overflow-x-auto">
                <table className="w-full min-w-[500px]">
                    <thead>
                        <tr className="border-b-2 border-[#1D1D1B]">
                            <th className="montserrat-main py-3 text-left text-sm font-semibold text-foreground">
                                Omschrijving
                            </th>
                            <th className="montserrat-main w-20 py-3 text-center text-sm font-semibold text-foreground">
                                Aantal
                            </th>
                            <th className="w-28 py-3 text-right text-sm font-semibold text-foreground">Prijs</th>
                            <th className="w-28 py-3 text-right text-sm font-semibold text-foreground">BTW</th>
                            <th className="w-28 py-3 text-right text-sm font-semibold text-foreground">
                                Totaal excl. BTW
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                                    Geen producten toegevoegd
                                </td>
                            </tr>
                        ) : (
                            data.products.map((product) => (
                                <tr key={product.id} className="border-b border-border">
                                    <td className="py-3 text-sm text-foreground">
                                        {product.description || "Geen omschrijving"}
                                    </td>
                                    <td className="py-3 text-center text-sm text-muted-foreground">
                                        {product.quantity}
                                    </td>
                                    <td className="py-3 text-right text-sm text-muted-foreground">
                                        {product.unitPrice.toFixed(2)}
                                    </td>
                                    <td className="py-3 text-right text-sm text-muted-foreground">
                                        {product.btw.toFixed(2)}%
                                    </td>
                                    <td className="py-3 text-right text-sm font-medium text-foreground">
                                        {(product.quantity * product.unitPrice).toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="mb-8 flex justify-end">
                <div className="w-64">
                    <div className="flex justify-between py-2 font-montserrat text-sm font-medium">
                        <span className="text-muted-foreground">Subtotaal</span>
                        <span className="text-foreground">{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border py-2 font-montserrat text-sm font-medium">
                        <span className="text-muted-foreground">BTW</span>
                        <span className="text-foreground">{btwTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-3 font-montserrat">
                        <span className="font-bold text-foreground">Totaal</span>
                        <span className="text-lg font-bold text-primary">{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Notes */}
            {data.notes && (
                <div className="mb-8 rounded-lg p-4">
                    <p className="montserrat-main mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        Opmerkingen
                    </p>
                    <p className="montserrat-main whitespace-pre-wrap text-sm text-foreground">{data.notes}</p>
                </div>
            )}

            {/* Footer */}
            <div className="space-y-1 border-t border-border pt-4 text-center text-xs text-muted-foreground">
                {data.company.email && <p>E-mail: {data.company.email}</p>}
                {data.company.phone && <p>Tel: {data.company.phone}</p>}
                {data.company.kvkNumber && <p>KVK: {data.company.kvkNumber}</p>}
                {data.company.btwNumber && <p>BTW: {data.company.btwNumber}</p>}
                {data.company.iban && <p>IBAN: {data.company.iban}</p>}
            </div>
            <div className="flex justify-center">
                <img src="logos/LogoGreen.svg" alt="watdefactuur" />
            </div>
        </div>
    );
}
