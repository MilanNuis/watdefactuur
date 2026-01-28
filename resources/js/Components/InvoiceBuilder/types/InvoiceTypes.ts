export interface Product {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    btw: number;
}

export interface CompanyInfo {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    email: string;
    phone: string;
    kvkNumber: string;
    btwNumber: string;
    iban: string;
    logo: string | null;
}

export interface ClientInfo {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    email: string;
    phone: string;
    houseNumber: string;
    street: string;
    country: string;
}

export interface InvoiceData {
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    company: CompanyInfo;
    client: ClientInfo;
    products: Product[];
    notes: string;
}
