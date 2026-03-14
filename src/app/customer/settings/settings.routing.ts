import { Routes } from '@angular/router';
import { Settings } from './settings';
import { MyInvoices } from './my-invoices/my-invoices';
import { Others } from './others/others';
import { MyPurchases } from './my-purchases/my-purchases';

export default [
  {
    path: '',
    component: Settings,
    children: [
      { path: '', redirectTo: 'my-invoices', pathMatch: 'full' },
      { path: 'my-invoices', component: MyInvoices, title: 'Meine Rechnungen' },
      { path: 'my-purchases', component: MyPurchases, title: 'Meine Bestellungen' },
      { path: 'other', component: Others, title: 'Andere' },
    ],
  },
] as Routes;
