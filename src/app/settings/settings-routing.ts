import { Routes } from '@angular/router';
import { Settings } from './settings';
import { Algorithmus } from './algorithmus/algorithmus';
import { Company } from './company/company';

export const settingsRoutes: Routes = [
  {
    path: '',
    component: Settings,
    children: [
      { path: '', redirectTo: 'profil', pathMatch: 'full' },
      { path: 'algorithmus', component: Algorithmus, title: 'Algorithmus - Einstellungen' },
      { path: 'company', component: Company, title: 'Company - Einstellungen' },
    ],
  },
];