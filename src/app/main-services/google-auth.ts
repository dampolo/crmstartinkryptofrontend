import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";

declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  private clientId = environment.googleClientId;

   getAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: this.clientId,
        scope: 'openid email profile',
        callback: (response: any) => {
          if (response?.access_token) {
            resolve(response.access_token);
          } else {
            reject('No access token');
          }
        },
      });

      // MUST be called from a user click
      tokenClient.requestAccessToken({ prompt: 'consent' });
    });
  }

}
