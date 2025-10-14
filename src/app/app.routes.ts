import { Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Apply } from './apply/apply';
import { Invoices } from './invoices/invoices';
import { Newcustomer } from './newcustomer/newcustomer';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
  { path: 'kunden', component: Customers, title: 'Alle Kunden' },
  { path: 'bewerbungen', component: Apply, title: 'Bewerbungen' },
  { path: 'rechnungen', component: Invoices, title: 'Rechnungen' },
  { path: 'neu-kunde', component: Newcustomer, title: 'Neuer Kunde' },
  // { path: 'einstellungen', component: Newcustomer, title: 'Einstellungen' },

  { path: '**', redirectTo: 'kunden' },
];