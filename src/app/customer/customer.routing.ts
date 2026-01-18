import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { MyCourses } from './my-courses/my-courses';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'my-courses', component: MyCourses },
    ],
  },
];
