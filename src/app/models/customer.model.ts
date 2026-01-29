
export interface Comment {
  id: number;
  user: number | null;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface CUSTOMER {
    id: number;
    image: string | null;
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
    has_subscription: boolean;
    invoices: number;
    updated_at: number;
    created_at: number;
    comments: Comment[];
}