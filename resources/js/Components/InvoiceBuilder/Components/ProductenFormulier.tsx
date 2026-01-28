import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Plus, Trash2, Search } from "lucide-react";
import { Textarea } from "../../ui/Textarea";
import { Button } from "@/Components/ui/button";
import { InvoiceData, Product } from "../types/InvoiceTypes";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

interface Props {
    invoiceData: InvoiceData;
    setData: (
        key: keyof InvoiceData,
        value: InvoiceData[keyof InvoiceData],
    ) => void;
    products?: Product[];
}

const createEmptyProduct = (): Product => ({
    id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
    description: "",
    quantity: 1,
    unitPrice: 0,
    btw: 21,
});

export default function ProductenFormulier({ invoiceData, setData, products }: Props) {
    const [searchTerm, setSearchTerm] = useState("");

    const addProduct = () => {
        setData("products", [...invoiceData.products, createEmptyProduct()]);
    };

    const addExistingProduct = (productId: string) => {
        const product = products?.find((p: any) => p.id.toString() === productId) as any;
        if (product) {
            setData("products", [
                ...invoiceData.products,
                {
                    id:
                        typeof crypto !== "undefined" && "randomUUID" in crypto
                            ? crypto.randomUUID()
                            : `${Date.now()}-${Math.random()}`,
                    description: product.name || product.description,
                    unitPrice: parseFloat((product.price_without_btw || product.unitPrice || 0).toString()),
                    btw: parseFloat((product.btw || 0).toString()),
                    quantity: 1,
                },
            ]);
        }
    };

    const filteredProducts = products?.filter((p: any) =>
        (p.name || p.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setData(
            "products",
            invoiceData.products.map((product) =>
                product.id === id ? { ...product, ...updates } : product,
            ),
        );
    };

    const removeProduct = (id: string) => {
        setData(
            "products",
            invoiceData.products.filter((product) => product.id !== id),
        );
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                    Factuurgegevens
                </h2>
                <p className="text-sm text-muted-foreground">
                    Voeg producten of diensten toe
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Factuurnummer</Label>
                    <Input
                        id="invoiceNumber"
                        value={invoiceData.invoiceNumber}
                        onChange={(e) =>
                            setData("invoiceNumber", e.target.value)
                        }
                        placeholder="2024-001"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="invoiceDate">Factuurdatum</Label>
                    <Input
                        id="invoiceDate"
                        type="date"
                        value={invoiceData.invoiceDate}
                        onChange={(e) => setData("invoiceDate", e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="dueDate">Vervaldatum</Label>
                    <Input
                        id="dueDate"
                        type="date"
                        value={invoiceData.dueDate}
                        onChange={(e) => setData("dueDate", e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <Label className="text-base">Producten / Diensten</Label>
                    <div className="flex items-center gap-2">
                        {products && products.length > 0 && (
                            <Select
                                value=""
                                onValueChange={(val) => {
                                    addExistingProduct(val);
                                    setSearchTerm("");
                                }}
                            >
                                <SelectTrigger className="w-[200px] h-9">
                                    <SelectValue placeholder="Kies een product" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="p-2 relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Zoeken..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="pl-9 h-8 text-xs"
                                        />
                                    </div>
                                    {filteredProducts.length === 0 ? (
                                        <div className="p-2 text-xs text-center text-muted-foreground">
                                            Geen producten gevonden
                                        </div>
                                    ) : (
                                        filteredProducts.map((p) => (
                                            <SelectItem
                                                key={p.id}
                                                value={p.id.toString()}
                                            >
                                                {(p as any).name ||
                                                    p.description}{" "}
                                                (€
                                                {(p as any).price_without_btw ||
                                                    p.unitPrice}
                                                )
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        )}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addProduct}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Toevoegen
                        </Button>
                    </div>
                </div>
                {invoiceData.products.length === 0 ? (
                    <div className="p-4 text-sm bg-card rounded-lg border border-border text-muted-foreground ">
                        Nog geen producten toegevoegd.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {invoiceData.products.map((product) => (
                            <div
                                key={product.id}
                                className="grid grid-cols-12 gap-2 items-end p-3 bg-card rounded-lg border border-border animate-slide-in"
                            >
                                <div className="col-span-12 md:col-span-4 space-y-1 flex flex-col">
                                    <Label className="text-xs text-muted-foreground">
                                        Omschrijving
                                    </Label>
                                    <Input
                                        value={product.description}
                                        onChange={(e) =>
                                            updateProduct(product.id, {
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder="Product of dienst"
                                    />
                                </div>
                                <div className="col-span-4 md:col-span-2 space-y-1 flex flex-col">
                                    <Label className="text-xs text-muted-foreground">
                                        Aantal
                                    </Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={product.quantity}
                                        onChange={(e) =>
                                            updateProduct(product.id, {
                                                quantity: Math.max(
                                                    1,
                                                    parseInt(
                                                        e.target.value,
                                                        10,
                                                    ) || 1,
                                                ),
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-span-4 md:col-span-3 space-y-1 flex flex-col">
                                    <Label className="text-xs text-muted-foreground">
                                        Prijs (€)
                                    </Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={product.unitPrice}
                                        onChange={(e) =>
                                            updateProduct(product.id, {
                                                unitPrice:
                                                    parseFloat(
                                                        e.target.value,
                                                    ) || 0,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-2 space-y-1 flex flex-col">
                                    <Label className="text-xs text-muted-foreground">
                                        BTW
                                    </Label>
                                    <Select
                                        value={product.btw.toString()}
                                        onValueChange={(value) =>
                                            updateProduct(product.id, {
                                                btw: parseFloat(value) || 0,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="BTW" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">
                                                0%
                                            </SelectItem>
                                            <SelectItem value="9">
                                                9%
                                            </SelectItem>
                                            <SelectItem value="21">
                                                21%
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-2 md:col-span-1 flex items-end justify-end md:justify-end md:items-center">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() =>
                                            removeProduct(product.id)
                                        }
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes">Opmerkingen</Label>
                <Textarea
                    id="notes"
                    value={invoiceData.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                    placeholder="Betalingsvoorwaarden, extra informatie, etc."
                    rows={3}
                />
            </div>
        </div>
    );
}
