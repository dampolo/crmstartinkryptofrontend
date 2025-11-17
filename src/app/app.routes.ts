import { Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Apply } from './apply/apply';
import { Invoices } from './invoices/invoices';
import { Newcustomer } from './newcustomer/newcustomer';
import { Dashboard } from './dashboard/dashboard';
import { Algorithmus } from './algorithmus/algorithmus';
import { Settings } from './settings/settings';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login, title: 'Login' },

  { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
  { path: 'kunden', component: Customers, title: 'Alle Kunden' },
  { path: 'bewerbungen', component: Apply, title: 'Bewerbungen' },
  { path: 'rechnungen', component: Invoices, title: 'Rechnungen' },
  { path: 'neu-kunde', component: Newcustomer, title: 'Neuer Kunde' },
  { path: 'algorithmus', component: Algorithmus, title: 'Algorithmus' },
   {
    path: 'einstellungen',
    loadChildren: () =>
      import('./settings/settings-routing').then(m => m.settingsRoutes),
  },
  { path: '**', redirectTo: 'kunden' },
];