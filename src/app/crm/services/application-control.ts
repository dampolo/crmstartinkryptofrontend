import { Injectable } from '@angular/core';
import { ApplicationFormData } from '../../models/application.model';

@Injectable({
  providedIn: 'root',
})

export class ApplicationControl {
  generateApplicationNumber() {
    const prefix = 'APP';
    let counter = 1;
    counter += 1;
    const paddedCounter = counter.toString().padStart(6, '0');
    return prefix + paddedCounter;
}

  Applications: ApplicationFormData[] = [
    {
      applicationNumber: 'APP000001',
      title: 'Herr',
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@example.com',
      phoneNumber: '+49 176 42568545',
      file: new File(['Dummy CV content'], 'Lebenslauf_Max.pdf', { type: 'application/pdf' }),
      file2: new File(['Other document'], 'Zeugnis.pdf', { type: 'application/pdf' }),
      privacyAccepted: true,
    },
    {
      applicationNumber: 'APP000002',
      title: 'Frau',
      firstName: 'Anna',
      lastName: 'Schmidt',
      email: 'anna.schmidt@example.com',
      phoneNumber: '+49 151 98765432',
      file: new File(['Dummy CV content'], 'Lebenslauf_Anna.pdf', { type: 'application/pdf' }),
      privacyAccepted: true,
    },
    {
      applicationNumber: 'APP000003',
      title: 'Divers',
      firstName: 'Jamie',
      lastName: 'Keller',
      email: 'jamie.keller@example.org',
      phoneNumber: '+49 160 12345678',
      file: new File(['Dummy CV content'], 'Lebenslauf_Jamie.pdf', { type: 'application/pdf' }),
      file2: new File(['Portfolio content'], 'Portfolio.pdf', { type: 'application/pdf' }),
      file3: new File(['Cover letter'], 'Motivationsschreiben.pdf', { type: 'application/pdf' }),
      privacyAccepted: true,
    },
    {
      applicationNumber: 'APP000004',
      title: 'Herr',
      firstName: 'Chris',
      lastName: 'Bauer',
      email: 'chris.bauer@example.net',
      phoneNumber: '+49 170 99887766',
      file: new File(['Dummy CV content'], 'Lebenslauf_Chris.pdf', { type: 'application/pdf' }),
      privacyAccepted: true,
    },
  ];
}
