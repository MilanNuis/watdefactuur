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

    if (products.data.length === 0) {
        return (
            <ProLayout>
                <div className="flex flex-row justify-between align-middle">
                    <Header
                        title="Producten"
                        description="Beheer hier je producten"
                    />
                    <CreateProductDialog />
                </div>

                <div className="flex flex-col items-center justify-center gap-4 py-12">
                    <img
                        src="/logos/EmptyImage.png"
                        alt="Empty state"
                        className="w-1/4"
                    />
                    <p className="text-center text-muted-foreground">
                        Geen producten gevonden. Maak je eerste product om te
                        beginnen.
                    </p>
                </div>
            </ProLayout>
        );
    }

    return (
        <ProLayout>
            <div className="flex items-center justify-between">
                <Header
                    title="Producten"
                    description="Beheer hier je producten"
                />
                <CreateProductDialog />
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-[--main-purple] font-bold">
                                Naam
                            </TableHead>
                            <TableHead className="text-[--main-purple] font-bold">
                                Prijs zonder BTW
                            </TableHead>
                            <TableHead className="text-[--main-purple] font-bold">
                                BTW
                            </TableHead>
                            <TableHead className="text-[--main-purple] font-bold">
                                Prijs met BTW
                            </TableHead>
                            <TableHead className="text-right text-[--main-purple] font-bold">
                                Acties
                            </TableHead>
                        </TableRow>
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

                                <TableCell className="text-right">
                                    <EditProductDialog product={product} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Paginator data={products} />
        </ProLayout>
    );
}
