import { Download, Mail, Check, FileText } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/Input";
import { InvoiceData } from "../types/InvoiceTypes";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/Components/ui/button";
export default function GenereerStap({ data }: { data: InvoiceData }) {
    const [email, setEmail] = useState(data.company.email);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [downloadComplete, setDownloadComplete] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const { toast } = useToast();

    const handleDownload = async () => {
        setIsDownloading(true);

        // Simulate download preparation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Create printable version
        const invoiceElement = document.getElementById("invoice-preview");
        if (invoiceElement) {
            const printWindow = window.open("", "_blank");
            if (printWindow) {
                printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Factuur ${data.invoiceNumber}</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Inter', -apple-system, sans-serif; padding: 40px; color: #1a1a1a; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 12px; text-align: left; }
                th { border-bottom: 2px solid #22c55e; }
                td { border-bottom: 1px solid #e5e5e5; }
                .text-right { text-align: right; }
                .text-center { text-align: center; }
                .text-muted { color: #6b7280; }
                .font-bold { font-weight: 700; }
                .text-primary { color: #22c55e; }
                .bg-muted { background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
                @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
              </style>
            </head>
            <body>
              ${invoiceElement.innerHTML}
            </body>
          </html>
        `);
                printWindow.document.close();
                printWindow.print();
            }
        }

        setIsDownloading(false);
        setDownloadComplete(true);
        toast({
            title: "Factuur gegenereerd!",
            description: "Je factuur is klaar om te printen of op te slaan als PDF.",
        });
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
    const btw = subtotal * 0.21;
    const total = subtotal + btw;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
        }).format(amount);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">Factuur Genereren</h2>
                <p className="text-sm text-muted-foreground">Download of verstuur je factuur</p>
            </div>

            {/* Summary Card */}
            <div className="bg-accent/50 rounded-xl p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">
                                Factuur {data.invoiceNumber || "Nieuw"}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {data.products.length} product{data.products.length !== 1 ? "en" : ""}
                            </p>
                        </div>
                    </div>
                    <div className="sm:ml-auto text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                        <p className="text-2xl font-bold text-primary">
                            {/* {formatCurrency(total)} */}
                        </p>
                        <p className="text-xs text-muted-foreground">incl. BTW</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-card/50 rounded-lg">
                        <p className="text-xs text-muted-foreground uppercase mb-1">Van</p>
                        <p className="font-medium text-foreground">{data.company.name || "Jouw bedrijf"}</p>
                    </div>
                    <div className="p-3 bg-card/50 rounded-lg">
                        <p className="text-xs text-muted-foreground uppercase mb-1">Aan</p>
                        <p className="font-medium text-foreground">{data.client.name || "Klant"}</p>
                    </div>
                </div>
            </div>

            {/* Download Option */}
            <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-3">Download als PDF</h3>
                <p className="text-sm text-muted-foreground mb-4">Download de factuur om te printen of op te slaan</p>
                <Button onClick={handleDownload} disabled={isDownloading || downloadComplete} className="w-full">
                    {downloadComplete ? (
                        <>
                            <Check className="w-4 h-4 mr-2" />
                            Gedownload
                        </>
                    ) : isDownloading ? (
                        "Voorbereiden..."
                    ) : (
                        <>
                            <Download className="w-4 h-4 mr-2" />
                            Download Factuur
                        </>
                    )}
                </Button>
            </div>

            {/* Email Option */}
            <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-3">Verstuur per e-mail</h3>
                <p className="text-sm text-muted-foreground mb-4">Stuur de factuur direct naar jezelf of je klant</p>
                <div className="space-y-3">
                    <div className="space-y-2">
                        <Label htmlFor="sendEmail">E-mailadres</Label>
                        <Input
                            id="sendEmail"
                            type="email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@voorbeeld.nl"
                        />
                    </div>
                    <Button
                        // onClick={handleEmail}
                        variant="outline"
                        // disabled={isSending || emailSent}
                        className="w-full"
                    >
                        {emailSent ? (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                Verzonden
                            </>
                        ) : isSending ? (
                            "Verzenden..."
                        ) : (
                            <>
                                <Mail className="w-4 h-4 mr-2" />
                                Verstuur Factuur
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
