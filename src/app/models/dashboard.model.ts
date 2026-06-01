import { CUSTOMER_CRM } from "./customer.model";
import { INVOICE } from "./invoice.model";

export interface DASHBOARD {
  customers_count: number;
  applicants_count: number;
  invioces_count: number;
  latest_customers: CUSTOMER_CRM[];
  latest_invoices: INVOICE[];
  latest_applicants: CUSTOMER_CRM[];
}