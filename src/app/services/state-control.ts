import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateControl {
  showToast: boolean = true;
  showError: boolean = false;
  showArrow: boolean = false;
  showToastText = signal('');
  showConfirmationText = signal('');

  removeShowToast() {
    setTimeout(() => {
    this.showToast = false;
    this.showToastText.set('');
    }, 2000);
  }

}
