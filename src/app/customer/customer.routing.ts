import { Routes } from '@angular/router';
import { LayoutCustomer } from './layout-customer/layout-customer';
import { MyCourses } from './my-courses/my-courses';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutCustomer,
    children: [
      { path: 'my-courses', component: MyCourses },
    ],
  },
];
