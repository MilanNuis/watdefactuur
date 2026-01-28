export interface Product {
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    btw: number;
}

export interface InvoiceType {
    id: string;
    invoice_number: string;
    invoice_date: string;
    due_date: string;
    client_first_name: string;
    client_last_name: string;
    client_email: string;
    client_phone: string;
    client_postalcode: string;
    client_house_number: string;
    client_city: string;
    client_street: string;
    client_country: string;
    products: Product[];
    subtotal: number;
    btw_total: number;
    total: number;
    status: string;
    created_at: string;
    updated_at: string;
}
