export interface CUSTOMER {
    id: number;
    photo: string;
    customer_number: string;
    title: 'Herr' | 'Frau' | 'Divers' | string;
    first_name: string;
    last_name: string;
    street: string;
    number: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    has_portfolio: boolean;
    comment: string;
    has_subscription: boolean;
    invoices: number;
}