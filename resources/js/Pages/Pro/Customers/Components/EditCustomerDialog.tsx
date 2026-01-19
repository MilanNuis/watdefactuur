import InputError from "@/Components/InputError";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import Customer from "../types";
import { Eye } from "lucide-react";

export default function EditCustomerDialog({ customer} : {customer: Customer}) {

    const [open, setOpen] = useState(false);

    const { data, setData, errors, patch, reset } = useForm({
        first_name: customer.first_name || "",
        last_name: customer.last_name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        postalCode: customer.postalcode || "",
        houseNumber: customer.house_number || "",
        city: customer.city || "",
        street: customer.street || "",
        country: customer.country || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route("pro.dashboard.customers.update", {customer: customer}), {
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
                   <Eye className="hover:cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="max-w-2xl w-full">
                    <DialogHeader>
                        <DialogTitle>Bewerk klant</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Label>Voornaam</Label>
                                <Input
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                    placeholder="Voornaam"
                                />
                                <InputError message={errors.first_name} />
                            </div>

                            <div className="flex-1">
                                <Label>Achternaam</Label>
                                <Input
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                    placeholder="Achternaam"
                                />
                                <InputError message={errors.last_name} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="klant@gmail.com"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div>
                            <Label htmlFor="phone">Telefoonnummer</Label>
                            <Input
                                type="tel"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                placeholder="06-12345678"
                            />
                            <InputError message={errors.phone} />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Label htmlFor="postalCode">Postcode</Label>
                                <Input
                                    value={data.postalCode}
                                    onChange={(e) =>
                                        setData("postalCode", e.target.value)
                                    }
                                    placeholder="1234 AB"
                                />
                                <InputError message={errors.postalCode} />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="houseNumber">Huisnummer</Label>
                                <Input
                                    value={data.houseNumber}
                                    onChange={(e) =>
                                        setData("houseNumber", e.target.value)
                                    }
                                    placeholder="12"
                                />
                                <InputError message={errors.houseNumber} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="street">Straat</Label>
                            <Input
                                value={data.street}
                                onChange={(e) =>
                                    setData("street", e.target.value)
                                }
                                placeholder="Straatnaam"
                            />
                            <InputError message={errors.street} />
                        </div>
                        <div>
                            <Label htmlFor="city">Stad</Label>
                            <Input
                                value={data.city}
                                onChange={(e) =>
                                    setData("city", e.target.value)
                                }
                                placeholder="Stad"
                            />
                            <InputError message={errors.city} />
                        </div>
                        <div>
                            <Label htmlFor="country">Land</Label>
                            <Input
                                value={data.country}
                                onChange={(e) =>
                                    setData("country", e.target.value)
                                }
                                placeholder="Land"
                            />
                            <InputError message={errors.country} />
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
                            Opslaan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
