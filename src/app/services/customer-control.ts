import { Injectable } from '@angular/core';
import { CUSTOMER } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerControl {
  
  customers: CUSTOMER[] = [
    {
      photo: '',
      customerNumber: '',
      title: 'Herr',
      firstName: 'John',
      lastName: 'Doe',
      street: 'Maple Street',
      number: '12A',
      postCode: '12345',
      city: 'Berlin',
      email: 'johndoe@gmail.com',
      phone: '+49 170 1234567',
      portfolio: true,
      comment: '',
      subscription: true,
      invoices: 0,
    },
  ];
}
