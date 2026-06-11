import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  showError: boolean = false;
  showArrow: boolean = false;
  showToast: boolean = false;
  showToastText = signal('');


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
