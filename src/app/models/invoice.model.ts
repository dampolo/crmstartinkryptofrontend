import { ServiceCatalog } from "./service-catalog.model";

export enum InvoiceType {
  INVOICE = 'invoice',
  CREDIT_NOTE = 'credit_note',
}

export enum PaymentStatus {
  PENDING = 'pending',
  UNPAID = 'unpaid',
  PAID = 'paid',
  CANCELED = 'canceled',
}

export enum PriceType {
  FIXED = 'fixed',
  PERCENT = 'percent',
}

// POST
export interface InvoiceCreate {
  customer: number;

  invoice_type: InvoiceType;
  invoice_status: PaymentStatus;

  provision: number;
  amount: number;
  investitions_amount: number;
  value_tax: number;

  services: ServiceCatalog[];
}

// GET
export interface Invoice {
  id: number;
  invoice_number: string;

  invoice_type: InvoiceType;
  invoice_status: PaymentStatus;

  customer: number;
  user: number;

  customer_name: string;
  customer_address: string;

  company_name: string;
  company_street: string;
  company_number: string;
  company_postcode: string;
  company_city: string;
  company_tax_number: string;
  company_email: string;
  company_bank: string;
  company_bank_account: string;
  company_swift_code: string;
  company_logo?: string | null;

  pdf_file?: string | null;

  created_at: string;
  updated_at: string;
  is_finalized: boolean;

  provision: number;
  amount: number;
  investitions_amount: number;
  value_tax: number;

  services: ServiceCatalog[];
}

export function createEmptyInvoice(): InvoiceCreate {
  return {
    customer: 0,
    invoice_type: InvoiceType.INVOICE,
    invoice_status: PaymentStatus.UNPAID,
    provision: 0,
    amount: 0,
    investitions_amount: 0,
    value_tax: 0,
    services: [],
  };
}