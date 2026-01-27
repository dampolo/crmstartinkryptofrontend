import { Component, effect, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { stateService } from '../../services/state-service';
import { CUSTOMER } from '../../../models/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.scss',
})
export class CustomerProfile {

  customerService = inject(UserService);
  stateService = inject(stateService);
  customer = signal<CUSTOMER | null>(null);
  showEdit: boolean = false;
  customerForm: FormGroup;


  ngOnInit(): void {
    this.customerService.getCustomer().subscribe({
      next: (profile) => {
        console.log(profile);
        
        this.customer.set(profile);
      },
      error: (err) => {
        console.error('Customer not found', err);
        
      }
    });
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      photo: [null],
      customer_number: [''],
      title: ['', Validators.required],
      first_name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$).+/)],
      ],
      last_name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$).+/)],
      ],
      street: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]+[a-zA-Z0-9\/\-]*$/)]],
      postcode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/), Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-\+\s]{6,15}$/)]],
      has_portfolio: [Boolean, Validators.required],
      comment: ['', Validators.maxLength(500)],
      has_subscription: [Boolean, Validators.required],
      invoices: [0],
    });

    effect(() => {
      this.customerForm.patchValue({
        customer_number: this.customer()?.customer_number,
        title: this.customer()?.title,
        first_name: this.customer()?.first_name,
        last_name: this.customer()?.last_name,
        email: this.customer()?.email,
        phone: this.customer()?.phone,

        street: this.customer()?.street,
        number: this.customer()?.number,
        postcode: this.customer()?.postcode,
        city: this.customer()?.city,

        has_portfolio: this.customer()?.has_portfolio,
        comment: this.customer()?.comments,
        has_subscription: this.customer()?.has_subscription,
        invoices: this.customer()?.invoices,
      });
    });
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const payload = this.customerForm.getRawValue();

    this.customerService.updateCustomer(payload).subscribe({
      next: () => {
        this.showConfirmation('Der Kunde wurde aktualisiert');
      },
      error: (err) => {
        this.showConfirmation('!! Verusche noch einmal');
      }
    })
  }

  showConfirmation(message: string) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.stateService.displayToast(message);
    this.showEdit = false;
    this.ngOnInit();
  }

  onCancel() {
    this.showEdit = false;
  }

  editDetails() {
    this.showEdit = true;
  }

}
