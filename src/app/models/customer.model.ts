export interface CUSTOMER {
    photo: string;
    customerNumber: string;
    title: 'Herr' | 'Frau' | 'Divers' | string;
    firstName: string;
    lastName: string;
    street: string;
    number: string;
    postCode: string;
    city: string;
    email: string;
    phone: string;
    portfolio: boolean;
    comment: string;
    subscription: boolean;
    invoices: number;
}