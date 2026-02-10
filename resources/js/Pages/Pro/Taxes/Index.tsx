import Header from "@/Components/Pro/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import ProLayout from "@/Layouts/ProLayout";
import IncomeTax from "./Components/IncomeTax";
import VatTax from "./Components/VatTax";
import { usePage } from "@inertiajs/react";
import { InvoiceType } from "@/types/invoice";

interface TaxesIndexProps {
    invoices: InvoiceType[];
}

export default function TaxesIndex() {
    const { invoices } = usePage().props as unknown as TaxesIndexProps;

    return (
        <ProLayout>
            <Header title="Belastingen" description="Beheer hier je belastingen" />
            <Tabs defaultValue="income-tax">
                <TabsList defaultValue="income-tax">
                    <TabsTrigger value="income-tax">Inkomstenbelasting</TabsTrigger>
                    <TabsTrigger value="vat">BTW</TabsTrigger>
                </TabsList>
                <TabsContent value="income-tax">
                    <IncomeTax />
                </TabsContent>
                <TabsContent value="vat">
                    <VatTax invoices={invoices} />
                </TabsContent>
            </Tabs>
        </ProLayout>
    );
}
