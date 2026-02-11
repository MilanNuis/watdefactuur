import { Download, Mail, Check, FileText } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { InvoiceData } from "../types/InvoiceTypes";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import axios from "axios";
interface Props {
    data: InvoiceData;
    isSubmitting: boolean;
}

export default function GenereerStap({ data, isSubmitting }: Props) {
    const [email, setEmail] = useState(data.company.email);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [downloadComplete, setDownloadComplete] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const { toast } = useToast();

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const response = await axios.post(route("pro.invoice-builder.download"), data, {
                responseType: "blob",
                headers: {
                    Accept: "application/pdf",
                },
            });
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `factuur-${data.invoiceNumber || "nieuw"}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            setDownloadComplete(true);
            toast({
                title: "Factuur gegenereerd!",
                description: "Je factuur is klaar om te printen of op te slaan als PDF.",
            });
        } catch {
            toast({
                title: "Download mislukt",
                description: "Er ging iets mis bij het genereren van de PDF.",
                variant: "destructive",
            });
        } finally {
            setIsDownloading(false);
        }
    };

    const handleEmail = async () => {
        if (!email) {
            toast({
                title: "E-mailadres vereist",
                description: "Vul een e-mailadres in om de factuur te versturen.",
                variant: "destructive",
            });
            return;
        }

        setIsSending(true);

        // Simulate email sending
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSending(false);
        setEmailSent(true);
        toast({
            title: "E-mail verzonden!",
            description: `De factuur is verstuurd naar ${email}`,
        });
    };

    const subtotal = data.products.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);
    const btw = data.products.reduce((sum, p) => sum + p.quantity * p.unitPrice * (p.btw / 100), 0);
    const total = subtotal + btw;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
        }).format(amount);
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h2 className="montserrat-main mb-1 text-xl font-semibold text-foreground">Factuur Genereren</h2>
                <p className="text-sm text-muted-foreground">Download of verstuur je factuur</p>
            </div>

            {/* Summary Card */}
            <div className="rounded-xl bg-accent/50 p-4 md:p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Factuur {data.invoiceNumber || "Nieuw"}</h3>
                            <p className="text-sm text-muted-foreground">
                                {data.products.length} product
                                {data.products.length !== 1 ? "en" : ""}
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-border pt-2 text-left sm:ml-auto sm:border-t-0 sm:pt-0 sm:text-right">
                        <p className="text-2xl font-bold text-primary">{formatCurrency(total)}</p>
                        <p className="text-xs text-muted-foreground">incl. BTW</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                    <div className="rounded-lg bg-card/50 p-3">
                        <p className="mb-1 text-xs uppercase text-muted-foreground">Van</p>
                        <p className="font-medium text-foreground">{data.company.name || "Jouw bedrijf"}</p>
                    </div>
                    <div className="rounded-lg bg-card/50 p-3">
                        <p className="mb-1 text-xs uppercase text-muted-foreground">Aan</p>
                        <p className="font-medium text-foreground">{data.client.name || "Klant"}</p>
                    </div>
                </div>
            </div>

            {/* Download Option */}
            <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="montserrat-main mb-3 font-semibold text-foreground">Download als PDF</h3>
                <p className="mb-4 text-sm text-muted-foreground">Download de factuur om te printen of op te slaan</p>
                <Button
                    onClick={handleDownload}
                    disabled={isDownloading || downloadComplete || isSubmitting}
                    className="w-full bg-[--main-green] text-white"
                    variant="home"
                >
                    {downloadComplete ? (
                        <>
                            <Check className="mr-2 h-4 w-4" />
                            Gedownload
                        </>
                    ) : isDownloading ? (
                        "Voorbereiden..."
                    ) : (
                        <>
                            <Download className="mr-2 h-4 w-4" />
                            Download Factuur
                        </>
                    )}
                </Button>
            </div>

            {/* Email Option */}
            <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="montserrat-main mb-3 font-semibold text-foreground">Verstuur per e-mail</h3>
                <p className="mb-4 text-sm text-muted-foreground">Stuur de factuur direct naar jezelf of je klant</p>
                <div className="space-y-3">
                    <div className="space-y-2">
                        <Label htmlFor="sendEmail">E-mailadres</Label>
                        <Input
                            id="sendEmail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@voorbeeld.nl"
                        />
                    </div>
                    <Button
                        onClick={handleEmail}
                        variant="outline"
                        disabled={isSending || emailSent}
                        className="w-full"
                    >
                        {emailSent ? (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Verzonden
                            </>
                        ) : isSending ? (
                            "Verzenden..."
                        ) : (
                            <>
                                <Mail className="mr-2 h-4 w-4" />
                                Verstuur Factuur
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
