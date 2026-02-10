import Header from "@/Components/Pro/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import ProLayout from "@/Layouts/ProLayout";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Settings } from "./types";

export default function SettingsIndex({ settings }: { settings: Settings }) {
    const { data, setData, errors, patch, reset } = useForm({
        name: settings?.name || "",
        email: settings?.email || "",
        phone: settings?.phone || "",
        address: settings?.address || "",
        city: settings?.city || "",
        iban: settings?.iban || "",
        kvk_number: settings?.kvk_number || "",
        btw_number: settings?.btw_number || "",
        invoice_prefix: settings?.invoice_prefix || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route("pro.dashboard.settings.update"));
    };
    return (
        <ProLayout>
            <Header title="Instellingen" description="Beheer hier je instellingen" />
            <Card className="my-4">
                <CardHeader>
                    <CardTitle className="montserrat-main">Algemene Instellingen</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Bedrijfsnaam</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mailadres</Label>
                            <Input id="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefoonnummer</Label>
                            <Input id="phone" value={data.phone} onChange={(e) => setData("phone", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Adres</Label>
                            <Input
                                id="address"
                                value={data.address}
                                onChange={(e) => setData("address", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">Plaats</Label>
                            <Input id="city" value={data.city} onChange={(e) => setData("city", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="iban">IBAN</Label>
                            <Input id="iban" value={data.iban} onChange={(e) => setData("iban", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kvk_number">KVK-nummer</Label>
                            <Input
                                id="kvk_number"
                                value={data.kvk_number}
                                onChange={(e) => setData("kvk_number", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="btw_number">BTW-nummer</Label>
                            <Input
                                id="btw_number"
                                value={data.btw_number}
                                onChange={(e) => setData("btw_number", e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="my-4">
                <CardHeader>
                    <CardTitle className="montserrat-main">Factuur Instellingen</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="invoice_prefix">Factuur Prefix</Label>
                            <Input
                                id="invoice_prefix"
                                value={data.invoice_prefix}
                                onChange={(e) => setData("invoice_prefix", e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-4 flex justify-end">
                <Button
                    variant={"home"}
                    type="button"
                    className="bg-[--main-green] text-white shadow"
                    onClick={handleSubmit}
                >
                    Opslaan
                </Button>
            </div>
        </ProLayout>
    );
}
