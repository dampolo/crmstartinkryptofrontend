import { Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Apply } from './apply/apply';
import { Invoices } from './invoices/invoices';
import { Newcustomer } from './newcustomer/newcustomer';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'kunden' },
  { path: 'kunden', component: Customers, title: 'Alle Kunden' },
  { path: 'bewerbungen', component: Apply, title: 'Bewerbungen' },
  { path: 'rechnungen', component: Invoices, title: 'Rechnungen' },
  { path: 'neu-kunde', component: Newcustomer, title: 'Neuer Kunde' },
  { path: 'einstellungen', component: Newcustomer, title: 'Einstellungen' },

  { path: '**', redirectTo: 'kunden' },
];