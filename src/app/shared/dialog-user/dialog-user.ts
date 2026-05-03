import { Component, Inject, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';

@Component({
    selector: 'app-dialog-user',
    imports: [CommonModule],
    templateUrl: './dialog-user.html',
    styleUrl: './dialog-user.scss',
})
export class DialogUser  {

    mainStateService = inject(MainStateService);
    authService = inject(AuthService);

    constructor(private router: Router) {

    }
    logOut() {
        this.authService.logout()
        this.router.navigate(["/kurse/login"])
        this.mainStateService.isLoginPage = true;
        this.mainStateService.displayToast('Du bist erfolgreich abgemeldet', true)
        this.mainStateService.isProfileVisible = false
    }

    openProfile() {
        this.router.navigate(["/customer/customer-profile"])

    }

}
