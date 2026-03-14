import { InvoiceCategory, PaymentMethod, PaymentStatus } from "./invoice.model";


export interface PURCHASE_CUSTOMER {
  id: number;
  invoice_number: string;
  invoice_category: InvoiceCategory;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  total: string;
}