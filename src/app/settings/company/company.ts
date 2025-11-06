import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyControl } from '../../services/company-control';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-company',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './company.html',
  styleUrl: './company.scss'
})
export class Company {
  companyForm: FormGroup;
  companyDetails = inject(CompanyControl);
  currentYear = new Date().getFullYear();
  showEdit:boolean = false;

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      // logo: [null, Validators.required],
      companyName: [this.companyDetails.companyName, [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$).+/)]],
      street: [this.companyDetails.street, [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      number: [this.companyDetails.number, [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      // German ZIP format (4–5 digits)
      postcode: [this.companyDetails.postcode, [Validators.required, Validators.pattern(/^[0-9]{4,5}$/), Validators.pattern(/^(?!\s*$).+/) ],],
      // city: [this.companyDetails.city, [Validators.required]],
      // ownerName: [this.companyDetails.ownerName, [Validators.required]],
      // taxNumber: [
      //   this.companyDetails.taxNumber,
      //   [
      //     Validators.required,
      //     Validators.pattern(/^[0-9]{3}\/[0-9]{4,5}\/[0-9]{4}$/), // e.g. 123/4567/8901
      //   ],
      // ],
    //   foundingYear: [
    //   this.companyDetails.founding,
    //   [
    //     Validators.required,
    //     Validators.pattern(/^[0-9]{4}$/), // 4-digit year only
    //     Validators.min(1800),
    //     Validators.max(this.currentYear),
    //   ],
    // ],
      // bank: [this.companyDetails.bank, Validators.required],
      // bankAccount: [this.companyDetails.bankAccount, [Validators.required]],
      // swiftCode: [this.companyDetails.swiftCode, [Validators.required],
      // ],
    });
  }

  onCancel() {
    this.showEdit = false;
  }

  editDetails() {
    this.showEdit = true;
  }

  submit() {
    console.log("TEST");
    
  }
}
