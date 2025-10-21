import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateControl } from '../services/state-control';

@Component({
  standalone: true,
  selector: 'app-newcustomer',
  imports: [ReactiveFormsModule],
  templateUrl: './newcustomer.html',
  styleUrl: './newcustomer.scss'
})
export class Newcustomer {
  newCustomerForm: FormGroup
  stateControl = inject(StateControl);

  constructor(private fb: FormBuilder) {
    this.newCustomerForm = this.fb.group({
      photo: [null],
      title: [''],
      firstName: ['', Validators.required],
      name: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      postcode: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)]
      ],
      city: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9\-\+\s]{6,15}$/)]
      ],
      receiveOffers: ['no', Validators.required],
      comment: ['', Validators.maxLength(500)]

    });
  }

  onSubmit() {
    this.stateControl.showToastText.set("Der Kunde wurde erstellt")    
  }
}
