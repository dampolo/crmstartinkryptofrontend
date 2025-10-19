import { Routes } from '@angular/router';
import { Settings } from './settings';
import { Algorithmus } from './algorithmus/algorithmus';

export const settingsRoutes: Routes = [
  {
    path: '',
    component: Settings,
    children: [
      { path: '', redirectTo: 'profil', pathMatch: 'full' },
      { path: 'algorithmus', component: Algorithmus, title: 'Algorithmus - Einstellungen' },
    ],
  },
];