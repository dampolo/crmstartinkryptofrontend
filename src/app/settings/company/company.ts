import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyControl } from '../../services/company-control';

@Component({
  standalone: true,
  selector: 'app-company',
  imports: [ReactiveFormsModule],
  templateUrl: './company.html',
  styleUrl: './company.scss'
})
export class Company {
  companyForm: FormGroup;
  companyDetails = inject(CompanyControl);
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      logo: [null, Validators.required],
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      postcode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{4,5}$/), // German ZIP format (4–5 digits)
        ],
      ],
      city: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      taxNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{3}\/[0-9]{4,5}\/[0-9]{4}$/), // e.g. 123/4567/8901
        ],
      ],
      foundingYear: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{4}$/), // 4-digit year only
        Validators.min(1800),
        Validators.max(this.currentYear),
      ],
    ],
    });
  }
}
