import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateControl {
  showToast: boolean = false;
  showError: boolean = false;
  showArrow: boolean = false;
  showToastText = signal('');
  showConfirmationText = signal('');

  removeShowToast() {
    setTimeout(() => {
    this.showToast = false;
    }, 2000);

    setTimeout(() => {
      this.showToastText.set('');
    }, 2500);
  }

}
