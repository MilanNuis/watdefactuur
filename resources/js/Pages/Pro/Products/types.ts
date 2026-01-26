export interface Product {
    id: string;
    name: string;
    description: string;
    price_without_btw: number;
    btw: number;
    price_with_btw: number;
}