import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { UserService } from '../services/user-service';
import { CUSTOMER } from '../../models/customer.model';

@Component({
    selector: 'app-dashboard-customer',
    imports: [RouterLink],
    templateUrl: './dashboard-customer.html',
    styleUrl: './dashboard-customer.scss',
})
export class DashboardCustomer {

    mainStateService = inject(MainStateService);
    authService = inject(AuthService);
    customerService = inject(UserService);
    customer = signal<CUSTOMER | null>(null);

    constructor(private router: Router) {

    }

    ngOnInit(): void {
        this.customerService.getCustomer().subscribe({
            next: (profile) => {
                console.log(profile);

                this.customer.set(profile);
            },
            error: (err) => {
                console.error('Customer not found', err);

            }
        });

    }
    logOut() {
        this.authService.logout()
        this.router.navigate(["/kurse/login"])
        this.mainStateService.isLoginPage = true;
        this.mainStateService.displayToast('Du bist erfolgreich abgemeldet', true)
        this.mainStateService.isProfileVisible = false
    }
}
