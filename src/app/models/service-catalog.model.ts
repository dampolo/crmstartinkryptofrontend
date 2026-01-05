export type ProvisionType = 'fixed' | 'percent';

export interface ServiceCatalog {
  id?: number,
  service_name: string,
  provision_type: ProvisionType,
  provision_fixed: string | null,
  provision_percent: string | null,
}

export interface InvoiceServices {
  id?: number,
  service_name: string,
  provision_type: ProvisionType,
  provision_fixed: string | null,
  provision_percent: string | null,
  provision_amount: number
}
