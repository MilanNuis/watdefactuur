import { LogoUpload } from "../../LogoUpload";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/Input";
export default function Bedrijfsgegevens() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="">
                <h2 className="text-xl font-semibold text-foreground mb-1">Jouw Bedrijfsgegevens</h2>

                <p className="text-sm text-muted-foreground">Vul je bedrijfsgegevens in voor op de factuur</p>
                <LogoUpload logo={""} onLogoChange={(logo) => onChange({ ...company, logo })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="companyName">Bedrijfsnaam *</Label>
                    <Input
                        id="companyName"
                        // value={company.name}
                        // onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Jouw Bedrijf B.V."
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="companyEmail">E-mailadres *</Label>
                    <Input
                        id="companyEmail"
                        type="email"
                        // value={company.email}
                        // onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="info@jouwbedrijf.nl"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="companyAddress">Adres</Label>
                    <Input
                        id="companyAddress"
                        // value={company.address}
                        // onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Straatnaam 123"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="companyPhone">Telefoonnummer</Label>
                    <Input
                        id="companyPhone"
                        // value={company.phone}
                        // onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+31 6 12345678"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="companyPostalCode">Postcode</Label>
                    <Input
                        id="companyPostalCode"
                        // value={company.postalCode}
                        // onChange={(e) => handleChange("postalCode", e.target.value)}
                        placeholder="1234 AB"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="companyCity">Plaats</Label>
                    <Input
                        id="companyCity"
                        // value={company.city}
                        // onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="Amsterdam"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="kvkNumber">KVK-nummer</Label>
                    <Input
                        id="kvkNumber"
                        // value={company.kvkNumber}
                        // onChange={(e) => handleChange("kvkNumber", e.target.value)}
                        placeholder="12345678"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="btwNumber">BTW-nummer</Label>
                    <Input
                        id="btwNumber"
                        // value={company.btwNumber}
                        // onChange={(e) => handleChange("btwNumber", e.target.value)}
                        placeholder="NL123456789B01"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="iban">IBAN</Label>
                    <Input
                        id="iban"
                        // value={company.iban}
                        // onChange={(e) => handleChange("iban", e.target.value)}
                        placeholder="NL91ABNA0417164300"
                    />
                </div>
            </div>
        </div>
    );
}
