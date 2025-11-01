import { Injectable } from '@angular/core';
import { CUSTOMER } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerControl {
  generateCustomerNumber() {
    const prefix = 'SK';
    let counter = 1;
    counter += 1;
    const paddedCounter = counter.toString().padStart(6, '0');
    return prefix + paddedCounter;
}

  generateCustomerInvoiceNumber() {
    const prefix = '#';
    let counter = 1;
    counter += 1;
    const paddedCounter = counter.toString().padStart(6, '0');
    return prefix + paddedCounter;
}

  customers: CUSTOMER[] = [
    {
      photo: '',
      customerNumber: 'SK000001',
      title: 'Herr',
      firstName: 'Aleksander',
      lastName: 'Mania',
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
    {
      photo: '',
      customerNumber: 'SK000002',
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
    {
      photo: '',
      customerNumber: 'SK000003',
      title: 'Frau',
      firstName: 'Anna',
      lastName: 'Schmidt',
      street: 'Lindenweg',
      number: '7B',
      postCode: '10115',
      city: 'Hamburg',
      email: 'anna.schmidt@email.de',
      phone: '+49 160 9876543',
      portfolio: false,
      comment: 'Interessiert an Premium-Abo',
      subscription: false,
      invoices: 2,
    },
    {
      photo: '',
      customerNumber: 'SK000004',
      title: 'Herr',
      firstName: 'Markus',
      lastName: 'Weber',
      street: 'Goethestraße',
      number: '5',
      postCode: '50667',
      city: 'Köln',
      email: 'markus.weber@example.com',
      phone: '+49 172 2223344',
      portfolio: true,
      comment: 'Regelmäßiger Kunde, gute Kommunikation',
      subscription: true,
      invoices: 5,
    },
    {
      photo: '',
      customerNumber: 'SK000005',
      title: 'Frau',
      firstName: 'Lisa',
      lastName: 'Müller',
      street: 'Bahnhofstraße',
      number: '22',
      postCode: '80331',
      city: 'München',
      email: 'lisa.mueller@example.de',
      phone: '+49 171 3344556',
      portfolio: false,
      comment: '',
      subscription: false,
      invoices: 1,
    },
  ];
}
