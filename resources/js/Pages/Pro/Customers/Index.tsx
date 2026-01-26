import ProLayout from "@/Layouts/ProLayout";
import Customer from "./types";
import { usePage } from "@inertiajs/react";
import Paginator from "@/components/Paginator";
import Header from "@/components/Pro/Header";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateCustomerDialog from "./Components/CreateCustomerDialog";
import EditCustomerDialog from "./Components/EditCustomerDialog";

export default function index() {
    interface customersProps {
        customers: {
            data: Customer[];
            links: { url: string | null; label: string; active: boolean }[];
            current_page: number;
        };
    }

    const { customers } = usePage().props as unknown as customersProps;

    return (
        <ProLayout>
            <div className="flex justify-between items-center">
                <Header title="Klanten" description="Beheer hier je klanten" />
                <CreateCustomerDialog />
            </div>

            <Table>
                <TableHeader>
                    <TableHead>Voornaam</TableHead>
                    <TableHead>Achternaam</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Acties</TableHead>
                </TableHeader>
                <TableBody>
                    {customers.data.map((customer: Customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">
                                {customer.first_name}
                            </TableCell>
                            <TableCell className="font-medium">
                                {customer.last_name}
                            </TableCell>
                            <TableCell className="font-medium">
                                {customer.email}
                            </TableCell>
                            <TableCell>
                                <EditCustomerDialog customer={customer} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Paginator data={customers} />
        </ProLayout>
    );
}
