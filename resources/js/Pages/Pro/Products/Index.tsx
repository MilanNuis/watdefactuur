import ProLayout from "@/Layouts/ProLayout";
import { usePage } from "@inertiajs/react";
import Paginator from "@/Components/Paginator";
import Header from "@/Components/Pro/Header";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Product } from "./types";
import CreateProductDialog from "./Components/CreateProductDialog";
import EditProductDialog from "./Components/EditProductDialog";

export default function index() {
    interface productsProps {
        products: {
            data: Product[];
            links: { url: string | null; label: string; active: boolean }[];
            current_page: number;
        };
    }

    const { products } = usePage().props as unknown as productsProps;

    return (
        <ProLayout>
            <div className="flex justify-between items-center">
                <Header
                    title="Producten"
                    description="Beheer hier je producten"
                />
                <CreateProductDialog />
            </div>

            <Table>
                <TableHeader>
                    <TableHead>Naam</TableHead>
                    <TableHead>Prijs zonder BTW</TableHead>
                    <TableHead>BTW</TableHead>
                    <TableHead>Prijs met BTW</TableHead>
                    <TableHead>Acties</TableHead>
                </TableHeader>
                <TableBody>
                    {products.data.map((product: Product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">
                                {product.name}
                            </TableCell>
                            <TableCell className="font-medium">
                                {product.price_without_btw}
                            </TableCell>
                            <TableCell className="font-medium">
                                {product.btw}%
                            </TableCell>
                            <TableCell className="font-medium">
                                {Number(product.price_without_btw) +
                                    (Number(product.price_without_btw) *
                                        Number(product.btw)) /
                                        100}
                            </TableCell>

                            <TableCell>
                                <EditProductDialog product={product} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Paginator data={products} />
        </ProLayout>
    );
}
