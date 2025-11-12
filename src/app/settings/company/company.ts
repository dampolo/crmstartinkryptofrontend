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
  companyData = inject(CompanyControl);
  stateControl = inject(StateControl)
  currentYear = new Date().getFullYear();
  showEdit: boolean = false;

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      logo: [this.companyData.logo, Validators.required],
      companyName: [
        this.companyData.logo,
        [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$).+/)],
      ],
      street: [
        this.companyData.street,
        [Validators.required, Validators.pattern(/^(?!\s*$).+/)],
      ],
      number: [
        this.companyData.number,
        [Validators.required, Validators.pattern(/^[0-9]+[a-zA-Z0-9\/\-]*$/)],
      ],
      // German ZIP format (4–5 digits)
      postcode: [
        this.companyData.postcode,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{4,5}$/),
          Validators.pattern(/^(?!\s*$).+/),
        ],
      ],
      city: [this.companyData.city, [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      ownerName: [
        this.companyData.ownerName,
        [Validators.required, Validators.pattern(/^(?!\s*$).+/)],
      ],
      taxNumber: [
        this.companyData.taxNumber,
        [Validators.required, Validators.pattern(/^DE[0-9]{9}$/)],
      ],
      bank: [this.companyData.bank, [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      bankAccount: [
        this.companyData.bankAccount,
        [Validators.required, Validators.pattern(/^[A-Z]{2}\d{2}(?: ?[A-Z0-9]){11,30}$/i)],
      ],
      swiftCode: [
        this.companyData.swiftCode,
        [Validators.required, Validators.pattern(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/i)],
      ],
      foundingYear: [
        this.companyData.founding,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{4}$/), // 4-digit year only
          Validators.min(1800),
          Validators.max(this.currentYear),
        ],
      ],
      email: [
        this.companyData.email,
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

    this.companyData.updateCompany(formData).subscribe({
      next: (response) => {
        this.stateControl.showToast = true;
        this.stateControl.showToastText.set("Firmendaten wurden erfolgreich gespeichert.");
        this.stateControl.removeShowToast();

      },
      error:(err) => {
        this.stateControl.showToast = true;
        this.stateControl.showToastText.set("Fehler beim Speichern der Daten.");
        this.stateControl.removeShowToast();
        console.error("Update failed: ", err);
        
      }
    })
  }
}
