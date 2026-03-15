import { InvoiceCategory, PaymentMethod, PaymentStatus } from "./invoice.model";


export interface PURCHASE_CUSTOMER {
  id: string;
  course_id: string;
  discount: string;
  invoice_number: string;
  invoice_category: InvoiceCategory;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  total: string;
  created_at: string;
}