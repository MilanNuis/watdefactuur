import Header from "@/Components/Pro/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { SidebarTrigger } from "@/Components/ui/sidebar";
import ProLayout from "@/Layouts/ProLayout";
import { FileText, Package, TrendingUp, Users } from "lucide-react";

export default function Index() {
    return (
        <ProLayout>
            <Header title="Overzicht" description="Overzicht van je bedrijf" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Klanten
                        </CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            0
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Totaal aantal klanten
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Producten
                        </CardTitle>
                        <Package className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            0
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Actieve producten
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Facturen
                        </CardTitle>
                        <FileText className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            0
                        </div>
                        <p className="text-xs text-muted-foreground">
                            0 openstaand, 1{" "}
                            verlopen
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Omzet
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            €100,00
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Betaalde facturen
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-4 mt-4">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Recente Facturen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="text-sm text-muted-foreground">
                                Geen recente facturen
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Recente Klanten</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="text-sm text-muted-foreground">
                                Geen recente klanten
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ProLayout>
    );
}