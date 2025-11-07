import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyControl } from '../../services/company-control';
import { CommonModule } from '@angular/common';
import { StateControl } from '../../services/state-control';

@Component({
  standalone: true,
  selector: 'app-company',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './company.html',
  styleUrl: './company.scss',
})
export class Company {
  companyForm: FormGroup;
  companyDetails = inject(CompanyControl);
  stateControl = inject(StateControl)
  currentYear = new Date().getFullYear();
  showEdit: boolean = false;

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      // logo: [null, Validators.required],
      companyName: [
        this.companyDetails.companyName,
        [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$).+/)],
      ],
      street: [
        this.companyDetails.street,
        [Validators.required, Validators.pattern(/^(?!\s*$).+/)],
      ],
      number: [
        this.companyDetails.number,
        [Validators.required, Validators.pattern(/^[0-9]+[a-zA-Z0-9\/\-]*$/)],
      ],
      // German ZIP format (4–5 digits)
      postcode: [
        this.companyDetails.postcode,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{4,5}$/),
          Validators.pattern(/^(?!\s*$).+/),
        ],
      ],
      city: [this.companyDetails.city, [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      ownerName: [
        this.companyDetails.ownerName,
        [Validators.required, Validators.pattern(/^(?!\s*$).+/)],
      ],
      taxNumber: [
        this.companyDetails.taxNumber,
        [Validators.required, Validators.pattern(/^DE[0-9]{9}$/)],
      ],
      bank: [this.companyDetails.bank, [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      bankAccount: [
        this.companyDetails.bankAccount,
        [Validators.required, Validators.pattern(/^[A-Z]{2}\d{2}(?: ?[A-Z0-9]){11,30}$/i)],
      ],
      swiftCode: [
        this.companyDetails.swiftCode,
        [Validators.required, Validators.pattern(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/i)],
      ],
      foundingYear: [
        this.companyDetails.founding,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{4}$/), // 4-digit year only
          Validators.min(1800),
          Validators.max(this.currentYear),
        ],
      ],
      email: [
        this.companyDetails.email,
        [Validators.required, Validators.pattern(/^(?!\s*$).+/), Validators.email],
      ],
    });
  }

  onCancel() {
    this.showEdit = false;
  }

  editDetails() {
    this.showEdit = true;
  }

  submit() {
    if(this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return
    }

    const formData = this.companyForm.value;

    
    this.stateControl.showToast = true;
    this.stateControl.showToastText.set("Firmendaten wurden abgeändert.");
    this.stateControl.removeShowToast();
  }
}
