import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CUSTOMER } from '../../models/customer.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private baseUrl = environment.apiBaseUrl;
	constructor(private http: HttpClient) { }

	// Get Customer
	getCustomer(): Observable<CUSTOMER> {
		return this.http.get<CUSTOMER>(this.baseUrl + 'profile-customer/', {
			withCredentials: true
		})
	}

	// Update Customer
	updateCustomer(payload: CUSTOMER): Observable<CUSTOMER> {
		return this.http.patch<CUSTOMER>(
			this.baseUrl + 'profile-customer/',
			payload,
			{ withCredentials: true }
		)
	}

}
