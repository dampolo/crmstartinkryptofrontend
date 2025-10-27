import { Injectable } from '@angular/core';
import { CUSTOMER } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerControl {

  generateCustomerNumber() {
    let customerPart1 = "SK";
    let customerPart2 = 1;
    customerPart2 += 1;
    const paddedNumber = customerPart2.toString().padStart(6, '0');
    return customerPart1 + paddedNumber;
  }
  
  customers: CUSTOMER[] = [
    {
      photo: '',
      customerNumber: "SK000001",
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
