import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAuth {
    initGoogle(clientId: string, callback: (token: string) => void) {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: any) => {
        callback(response.credential); // ID token
      }
    });
  }

  signIn() {
    google.accounts.id.prompt(); // opens Google popup
  }
}
