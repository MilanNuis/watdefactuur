import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/Input";
export default function KlantInfoformulier() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">Klantgegevens</h2>
                <p className="text-sm text-muted-foreground">Vul de gegevens van je klant in</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="clientName">Naam / Bedrijfsnaam *</Label>
                    <Input
                        id="clientName"
                        // value={client.name}
                        // onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Klant B.V."
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="clientEmail">E-mailadres</Label>
                    <Input
                        id="clientEmail"
                        type="email"
                        // value={client.email}
                        // onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="klant@email.nl"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="clientAddress">Adres</Label>
                    <Input
                        id="clientAddress"
                        // value={client.address}
                        // onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Straatnaam 456"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="clientPostalCode">Postcode</Label>
                    <Input
                        id="clientPostalCode"
                        // value={client.postalCode}
                        // onChange={(e) => handleChange("postalCode", e.target.value)}
                        placeholder="5678 CD"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="clientCity">Plaats</Label>
                    <Input
                        id="clientCity"
                        // value={client.city}
                        // onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="Rotterdam"
                    />
                </div>
            </div>
        </div>
    );
}
