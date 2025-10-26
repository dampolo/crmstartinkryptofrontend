import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerControl {
  
  Customers = [
    {
      firstName: 'John',
      lastName: 'Doe',
      street: 'Maple Street',
      number: '12A',
      postalCode: '12345',
      city: 'Berlin',
      mobile: '+49 170 1234567',
      portfolio: 'Real Estate',
      subscription: 'Premium',
    },
    {
      firstName: 'Emily',
      lastName: 'Smith',
      street: 'Oak Avenue',
      number: '45',
      postalCode: '54321',
      city: 'Munich',
      mobile: '+49 176 9876543',
      portfolio: 'Stocks',
      subscription: 'Basic',
    },
    {
      firstName: 'Michael',
      lastName: 'Brown',
      street: 'Pine Road',
      number: '8B',
      postalCode: '10115',
      city: 'Hamburg',
      mobile: '+49 160 5556677',
      portfolio: 'Crypto',
      subscription: 'Gold',
    },
  ];
}
