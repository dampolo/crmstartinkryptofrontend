import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { MyCourses } from './my-courses/my-courses';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: Layout,
    // canActivate: [clientGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'my-courses', component: MyCourses },
    ],
  },
];
