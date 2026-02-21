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
import { LoginCustomer } from './customer/login-customer/login-customer';
import { Confirmation } from './shared/confirmation/confirmation';
import { ForgotPassword } from './customer/forgot-password/forgot-password';
import { ResetPassword } from './customer/reset-password/reset-password';
import { CreateAccount } from './customer/create-account/create-account';
import { MyCourses } from './customer/courses/my-courses/my-courses';
import { DashboardCustomer } from './customer/dashboard-customer/dashboard-customer';
import { LayoutCustomer } from './customer/layout-customer/layout-customer';
import { Courses } from './customer/courses/courses';
import { CustomerProfile } from './customer/user-customer/profile/customer-profile';
import { LayoutAuth } from './customer/layout-auth/layout-auth';
import { AddNewVideo } from './crm/upload-course/add-new-video/add-new-video';
import { ListCourseLessons } from './crm/upload-course/list-course-lessons/list-course-lessons';
import { AllCourses } from './crm/upload-course/all-courses';
import { ListOfLessons } from './customer/courses/list-of-lessons/list-of-lessons';
import { Payment } from './customer/courses/payment/payment';
import { Paypal } from './customer/courses/payment/paypal/paypal';
import { Main } from './website/main/main';
import { Termin } from './website/termin/termin';
import { Datenschutz } from './website/datenschutz/datenschutz';
import { Impressum } from './website/impressum/impressum';
import { Faq } from './website/faq/faq';
import { LayoutWebsite } from './website/layout-website/layout-website';



export const routes: Routes = [

    // Startseite (index.html)
    {
        path: '',
        component: LayoutWebsite,
        children: [
            { path: '', component: Main, title: 'Startseite' },
            { path: 'termin', component: Termin, title: 'Termin vereinbaren' },
            { path: 'datenschutz', component: Datenschutz, title: 'Datenschutz' },
            { path: 'impressum', component: Impressum, title: 'Impressum' },
            { path: 'faq', component: Faq, title: 'FAQ' },

        ]
    },
    // Kurse Bereich

    {
        path: 'kurse',
        component: LayoutAuth,
        children: [
            { path: '', component: Courses, title: 'Kurse' },
            { path: 'login', component: LoginCustomer, title: 'Anmelden' },
            { path: 'create-account', component: CreateAccount, title: 'Konto erstellen' },
            { path: 'reset-password/:uid/:token', component: ResetPassword, title: 'Passwort zurücksetzen' },
            { path: 'forgot-password', component: ForgotPassword, title: 'Passwort vergessen' },
            { path: 'confirmation', component: Confirmation, title: 'Bestätigung' },

        ]
    },

    {
        path: 'customer',
        component: LayoutCustomer,
        // canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardCustomer },
            { path: 'courses', component: Courses, title: 'Kurse' },
            {
                path: 'courses',
                children: [
                    { path: 'payment/:courseId', component: Payment, title: 'Kurs - Zahlung' },
                    { path: 'payment/:courseId/paypal', component: Paypal, title: 'Kurs - Zahlung - Paypal' },

                ]
            },
            { path: 'my-courses', component: MyCourses, title: 'Meine Kurse' },
            {
                path: 'my-courses',
                children: [
                    { path: 'list-of-lessons/:courseId', component: ListOfLessons, title: 'Basic - List' },
                ]
            },
            { path: 'customer-profile', component: CustomerProfile, title: 'Kunde' },
            { path: 'forgot-password', component: ForgotPassword, title: 'Passwort vergessen' },
        ],
    },

    // CRM Login

    { path: 'crm/login', component: Login },
    
    // CRM
    {
        path: 'crm',
        component: Layout,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
            { path: 'kunden', component: Customers, title: 'Alle Kunden' },
            { path: 'kunden/:id', component: CustomerDetails },
            { path: 'kunden/:id/comments', component: CustomerComments },
            { path: 'bewerbungen', component: Apply, title: 'Bewerbungen' },
            { path: 'rechnungen', component: Invoices, title: 'Rechnungen' },
            { path: 'neu-kunde', component: Newcustomer, title: 'Neuer Kunde' },
            { path: 'algorithmus', component: Algorithmus, title: 'Algorithmus' },
            { path: 'kurse', component: AllCourses, title: 'Kurs hinzufügen' },
            {
                path: 'kurse',
                children: [
                    { path: 'list-lessons', component: ListCourseLessons, title: 'Basic - List' },
                    { path: 'neue-video', component: AddNewVideo, title: 'Neue Video' }
                ]
            },

            {
                path: 'einstellungen',
                loadChildren: () =>
                    import('./crm/settings/settings.routing').then(m => m.default),
            },
        ],
    },

    { path: '**', redirectTo: 'dashboard' },
];
