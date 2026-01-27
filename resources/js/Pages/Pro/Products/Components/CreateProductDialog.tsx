import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function CreateProductDialog() {

    const [open, setOpen] = useState(false);

    const { data, setData, errors, post, reset } = useForm({
        name: "",
        description: "",
        price_without_btw: 0,
        btw: 0,
        price_with_btw: 0,
    });

    useEffect(() => {
        setData("price_with_btw", data.price_without_btw + (data.price_without_btw * data.btw / 100));
    }, [data.price_without_btw, data.btw]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("pro.dashboard.products.store"), {
            onSuccess: () => {
                setOpen(false);
                reset()
            },
        });
    };
    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant={"secondary"}>Nieuw product</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl w-full">
                    <DialogHeader>
                        <DialogTitle>Nieuw product</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Label>Naam</Label>
                                <Input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Naam"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="flex-1">
                                <Label>Omschrijving</Label>
                                <Input
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    placeholder="Omschrijving"
                                />
                                <InputError message={errors.description} />
                            </div>
                        </div>
                        <div>
                                <Label htmlFor="price_without_btw">Prijs zonder BTW</Label>
                            <Input
                                type="number"
                                value={data.price_without_btw}
                                onChange={(e) =>
                                    setData("price_without_btw", Number(e.target.value))
                                }
                                placeholder="Prijs zonder BTW"
                            />
                            <InputError message={errors.price_without_btw} />
                        </div>
                        <div>
                            <Label htmlFor="btw">BTW</Label>
                            <Select
                                value={String(data.btw)}
                                onValueChange={(value) =>
                                    setData("btw", Number(value))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="BTW" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">0%</SelectItem>
                                    <SelectItem value="9">9%</SelectItem>
                                    <SelectItem value="21">21%</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="price_with_btw">Prijs met BTW</Label>
                            <Input
                                disabled
                                type="number"
                                onChange={(e) =>
                                    setData("price_with_btw", Number(e.target.value))
                                }
                                placeholder="Prijs met BTW"
                                value={data.price_without_btw + (data.price_without_btw * data.btw / 100)}
                            />
                            <InputError message={errors.price_with_btw} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"outline"}>Annuleren</Button>
                        </DialogClose>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            variant={"secondary"}
                        >
                            Aanmaken
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
