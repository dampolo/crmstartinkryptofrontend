import { Component, inject } from '@angular/core';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { ToastService } from '../../main-services/toast-service';

@Component({
    selector: 'app-dialog-customer',
    imports: [CommonModule],
    templateUrl: './dialog-customer.html',
    styleUrl: './dialog-customer.scss',
})
export class DialogCustomer  {

    mainStateService = inject(MainStateService);
    toastService = inject(ToastService);
    authService = inject(AuthService);

    constructor(private router: Router) {

    }
    logOut() {
        this.authService.logout()
        this.router.navigate(["/kurse/login"])
        this.toastService.displayToast('Du bist erfolgreich abgemeldet', true)
        this.mainStateService.isProfileVisible = false
    }

    openProfile() {
        this.router.navigate(["/customer/profile"])

    }

}
