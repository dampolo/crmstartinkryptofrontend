import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-newcustomer',
  imports: [ReactiveFormsModule],
  templateUrl: './newcustomer.html',
  styleUrl: './newcustomer.scss'
})
export class Newcustomer {
  newCustomerForm: FormGroup


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

  }
}
