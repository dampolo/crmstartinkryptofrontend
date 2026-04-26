import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainStateService {
  isMenuOpen: boolean = false
  showToast: boolean = false;
  showError: boolean = false;
  showArrow: boolean = false;
  isLoginPage: boolean = true;
  isProfileVisible: boolean = false;

  posFixBurger: boolean = false;
	posFixLogo: boolean = false;

  isEditFeatureVisible: boolean = false;
  
  isForgotPasswordVisible: boolean = false;
  showToastText = signal('');
  showConfirmationText = signal('');
  showConfirmationLink = signal('');


  removeShowToast() {
    setTimeout(() => {
      this.showToast = false;
    }, 2000);

    setTimeout(() => {
      this.showToastText.set('');
    }, 2500);
  }

  displayToast(message: string, status: boolean) {
    this.showToast = true;
    this.showArrow = status;
    this.showError = !status
    this.showToastText.set(message);
    this.removeShowToast();
  }
}
