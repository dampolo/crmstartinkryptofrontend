
export interface Comment {
    id: number;
    user: number | null;
    text: string;
    created_at: string;
    updated_at: string;
}

export enum UserTitle {
    HERR = 'Herr',
    FRAU = 'Frau',
    DIVERS = 'Divers',
}

export enum UserType {
    BUSINESS = 'business',
    CUSTOMER = 'customer',
    APPLICANT = 'applicant',
}

export interface USER {
    image: string | null;
    customer_number: string;
    title: UserTitle;
    type: UserType;
    first_name: string;
    last_name: string;
    street: string;
    street_number: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export interface CUSTOMER extends USER {
    has_portfolio: boolean;
    has_subscription: boolean;
    invoices: number;
}

export interface CUSTOMER_CRM extends USER {
    id: number;
    has_portfolio: boolean;
    has_subscription: boolean;
    invoices: number;
    created_at: number;
    updated_at: number;
    comments: Comment[];
}