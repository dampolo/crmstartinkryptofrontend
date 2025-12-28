export type ProvisionType = 'fixed' | 'percent';

export interface ServiceCatalog {
  id?: number,
  name: string,
  provison_type: ProvisionType,
  amount_fixed: null | string
  amount_percent: null | string
}
