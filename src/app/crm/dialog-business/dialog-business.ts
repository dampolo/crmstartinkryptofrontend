import { Component, Inject, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../main-services/main-state-service';
import { AuthService } from '../../main-services/auth-service';
import { ToastService } from '../../main-services/toast-service';

@Component({
    selector: 'app-dialog-user',
    imports: [CommonModule],
    templateUrl: './dialog-business.html',
    styleUrl: './dialog-business.scss',
})
export class DialogBusiness  {
    mainStateService = inject(MainStateService);
    toastService = inject(ToastService);
    authService = inject(AuthService);
    router = inject(Router);

    logOut() {
        this.authService.logout()
        this.router.navigate(["/kurse/login"])
        this.toastService.displayToast('Du bist erfolgreich abgemeldet', true)
        this.mainStateService.isProfileVisible = false
    }

    openProfile() {
        this.router.navigate(["/crm/profile"])
    }

}
