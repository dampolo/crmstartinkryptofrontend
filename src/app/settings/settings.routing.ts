import { Routes } from '@angular/router';
import { Settings } from './settings';
import { Algorithmus } from './algorithmus/algorithmus';
import { Company } from './company/company';

export default [
  {
    path: '',
    component: Settings,
    children: [
      { path: '', redirectTo: 'firma', pathMatch: 'full' },
      { path: 'firma', component: Company, title: 'Company - Einstellungen' },
      { path: 'algorithmus', component: Algorithmus, title: 'Algorithmus - Einstellungen' },
    ],
  },
] as Routes;
