import { useState, useRef, useEffect } from "react";
import { Label } from "@/Components/ui/label";
import { ClientInfo } from "../types/InvoiceTypes";
import { Input } from "@/Components/ui/input";
import Customer from "@/Pages/Pro/Customers/types";
import { Search, X } from "lucide-react";

interface Props {
    client: ClientInfo;
    onChange: (value: ClientInfo) => void;
    customers?: Customer[];
}

export default function KlantInfoformulier({ client, onChange, customers }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleChange = (field: keyof ClientInfo, value: string) => {
        onChange({ ...client, [field]: value });
    };

    const handleSelectCustomer = (customer: Customer) => {
        onChange({
            name: customer.first_name + " " + customer.last_name,
            email: customer.email,
            address: customer.street + " " + customer.house_number,
            phone: customer.phone,
            postalCode: customer.postalcode,
            city: customer.city,
            houseNumber: customer.house_number,
            street: customer.street,
            country: customer.country,
        });
        setSearchTerm("");
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
        searchInputRef.current?.blur();
    };

    const filteredCustomers =
        customers?.filter((c) =>
            `${c.first_name} ${c.last_name} ${c.email}`.toLowerCase().includes(searchTerm.toLowerCase()),
        ) || [];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
                setHighlightedIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setIsDropdownOpen(false);
            setHighlightedIndex(-1);
            searchInputRef.current?.blur();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev < filteredCustomers.length - 1 ? prev + 1 : prev));
            setIsDropdownOpen(true);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            e.preventDefault();
            const customer = filteredCustomers[highlightedIndex];
            if (customer) {
                handleSelectCustomer(customer);
            }
        }
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setIsDropdownOpen(true);
        setHighlightedIndex(-1);
    };

    const handleSearchFocus = () => {
        if (hasCustomers) {
            setIsDropdownOpen(true);
        }
    };

    const clearSearch = () => {
        setSearchTerm("");
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
        searchInputRef.current?.focus();
    };

    const hasCustomers = customers && customers.length > 0;

    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h2 className="montserrat-main mb-1 text-xl font-semibold text-foreground">Klantgegevens</h2>
                <p className="montserrat-main text-sm text-muted-foreground">Vul de gegevens van je klant in</p>
            </div>

            {/* Customer Search - Only show for Pro users with customers */}
            {hasCustomers && (
                <div className="relative">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Zoek een klant..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            onFocus={handleSearchFocus}
                            onKeyDown={handleKeyDown}
                            className="pl-9 pr-9"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute z-50 mt-1 max-h-[300px] w-full overflow-auto rounded-md border border-border bg-popover shadow-lg"
                        >
                            {filteredCustomers.length === 0 ? (
                                <div className="p-3 text-center text-sm text-muted-foreground">
                                    Geen klanten gevonden
                                </div>
                            ) : (
                                <div className="py-1">
                                    {filteredCustomers.map((customer, index) => (
                                        <button
                                            key={customer.id}
                                            type="button"
                                            onClick={() => handleSelectCustomer(customer)}
                                            onMouseEnter={() => setHighlightedIndex(index)}
                                            className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                                                highlightedIndex === index
                                                    ? "bg-accent text-accent-foreground"
                                                    : "hover:bg-accent/50"
                                            }`}
                                        >
                                            <div className="font-medium">
                                                {customer.first_name} {customer.last_name}
                                            </div>
                                            <div className="text-xs text-muted-foreground">{customer.email}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="clientName">Naam / Bedrijfsnaam *</Label>
                    <Input
                        id="clientName"
                        value={client.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Klant B.V."
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="clientEmail">E-mailadres</Label>
                    <Input
                        id="clientEmail"
                        type="email"
                        value={client.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="klant@email.nl"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="clientPhone">Telefoonnummer</Label>
                    <Input
                        id="clientPhone"
                        type="tel"
                        value={client.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+31 6 12345678"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="clientAddress">Adres</Label>
                    <Input
                        id="clientAddress"
                        value={client.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Straatnaam 456"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="clientPostalCode">Postcode</Label>
                    <Input
                        id="clientPostalCode"
                        value={client.postalCode}
                        onChange={(e) => handleChange("postalCode", e.target.value)}
                        placeholder="5678 CD"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="clientCity">Plaats</Label>
                    <Input
                        id="clientCity"
                        value={client.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="Rotterdam"
                    />
                </div>
            </div>
        </div>
    );
}
