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

  companyName = "Star in Krypto";
  street = "Chiemgastrasse";
  number = "156";
  postcode = "81549";
  city = "München"
  ownerName = "Elisabeth Poloczek"
  taxNUmber = "DE455357286"



  removeShowToast() {
    setTimeout(() => {
    this.showToast = false;
    }, 2000);

    setTimeout(() => {
      this.showToastText.set('');
    }, 2500);
  }

}
