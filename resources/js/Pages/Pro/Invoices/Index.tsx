import Header from "@/Components/Pro/Header";
import ProLayout from "@/Layouts/ProLayout";
import ProInvoiceBuilder from "../ProInvoiceBuilder";
export default function Index() {
    return (
        <ProLayout>
            <Header title="Facturen" description="Beheer hier je facturen" />
            <ProInvoiceBuilder />
        </ProLayout>
    );
}
