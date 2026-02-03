import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainStateService {
  showToast: boolean = false;
  showError: boolean = false;
  showArrow: boolean = false;
  isLoginPage: boolean = true;
  isProfileVisible: boolean = false
  isForgotPasswordVisible: boolean = false;
  showToastText = signal('');
  showConfirmationText = signal('');
  showConfirmationLink = signal(false);


  removeShowToast() {
    setTimeout(() => {
      this.showToast = false;
    }, 2000);

    setTimeout(() => {
      this.showToastText.set('');
    }, 2500);
  }

  displayToast(message: string) {
    this.showToast = true;
    this.showToastText.set(message);
    this.removeShowToast();
  }
}
