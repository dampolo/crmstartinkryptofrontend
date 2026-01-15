import { Routes } from '@angular/router';
import { Apply } from './crm/apply/apply';
import { Invoices } from './crm/invoices/invoices';
import { Dashboard } from './crm/dashboard/dashboard';
import { Algorithmus } from './crm/algorithmus/algorithmus';
import { authGuard } from './guards/auth-guard';
import { Layout } from './crm/layout/layout';
import { Customers } from './crm/customers/customers';
import { CustomerDetails } from './crm/customers/customer-details/customer-details';
import { CustomerComments } from './crm/customers/customer-comments/customer-comments';
import { Newcustomer } from './crm/newcustomer/newcustomer';
import { Login } from './crm/login/login';
import { LoginCustomer } from './customer/login/login-customer';
import { RegisterCustomer } from './customer/register-customer/register-customer';
import { PwdResetCustomer } from './customer/pwd-reset-customer/pwd-reset-customer';
import { PwdRecoveryCustomer } from './customer/pwd-recovery-customer/pwd-recovery-customer';
import { Confirmation } from './shared/confirmation/confirmation';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', component: LoginCustomer },
  { path: 'register', component: RegisterCustomer },
  { path: 'reset-password', component: PwdResetCustomer },
  { path: 'recovery-password', component: PwdRecoveryCustomer },
  { path: 'confirmation', component: Confirmation },


  { path: 'crm/login', component: Login },

    {
    path: 'client',
    loadChildren: () =>
      import('./customer/customer.routing').then(m => m.CLIENT_ROUTES),
  },

  // CRM
  {
    path: 'crm',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
      { path: 'kunden', component: Customers, title: 'Alle Kunden'},
      { path: 'kunden/:id', component: CustomerDetails },
      { path: 'kunden/:id/comments', component: CustomerComments },
      { path: 'bewerbungen', component: Apply, title: 'Bewerbungen' },
      { path: 'rechnungen', component: Invoices, title: 'Rechnungen' },
      { path: 'neu-kunde', component: Newcustomer, title: 'Neuer Kunde' },
      { path: 'algorithmus', component: Algorithmus, title: 'Algorithmus' },
      {
        path: 'einstellungen',
        loadChildren: () =>
          import('./crm/settings/settings.routing').then(m => m.default),
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
