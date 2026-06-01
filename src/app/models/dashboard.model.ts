import { CUSTOMER_CRM } from "./customer.model";

export interface DashboardCrmResponse {
  customers_count: number;
  applicants_count: number;
  invoices_count: number;
  latest_customers: CUSTOMER_CRM[];
}