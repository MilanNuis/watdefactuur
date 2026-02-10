import Header from "@/Components/Pro/Header";
import Adminlayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Users, FileText } from "lucide-react";

interface DashboardData {
    userCount: number;
    invoiceCount: number;
    prouserCount: number;
    proUsersPerDay: { date: string; label: string; proUsers: number }[];
    invoicesPerDay: { date: string; label: string; invoices: number }[];
}

const proUsersChartConfig = {
    proUsers: {
        label: "Nieuwe Pro users",
        color: "var(--main-green)",
    },
} satisfies ChartConfig;

const invoicesChartConfig = {
    invoices: {
        label: "Facturen",
        color: "var(--main-green)",
    },
} satisfies ChartConfig;

export default function Index() {
    const {
        userCount,
        invoiceCount,
        prouserCount,
        proUsersPerDay,
        invoicesPerDay,
    } = usePage().props as unknown as DashboardData;

    return (
        <Adminlayout>
            <Header
                title="Dashboard"
                description="Overzicht van platformstatistieken"
            />

            <div className="mt-6 grid gap-6">
                {/* Summary cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Totaal gebruikers
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {userCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Alle geregistreerde gebruikers
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pro users
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {prouserCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Gebruikers met Pro abonnement
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Totaal facturen
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {invoiceCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Alle aangemaakte facturen
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Nieuwe Pro users (afgelopen week)
                            </CardTitle>
                            <CardDescription>
                                Aantal nieuwe Pro subscriptions per dag
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={proUsersChartConfig}
                                className="h-[300px] w-full"
                            >
                                <BarChart
                                    data={proUsersPerDay}
                                    margin={{ left: 12, right: 12 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="label"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        allowDecimals={false}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                        dataKey="proUsers"
                                        fill="var(--color-proUsers)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Facturen (afgelopen week)</CardTitle>
                            <CardDescription>
                                Aantal aangemaakte facturen per dag
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={invoicesChartConfig}
                                className="h-[300px] w-full"
                            >
                                <BarChart
                                    data={invoicesPerDay}
                                    margin={{ left: 12, right: 12 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="label"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        allowDecimals={false}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                        dataKey="invoices"
                                        fill="var(--color-invoices)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Adminlayout>
    );
}
