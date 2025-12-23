import { Component, inject, OnInit } from '@angular/core';
import { AlgorithmusControl } from '../../services/algorithmus-control';
import { CommonModule, DecimalPipe } from '@angular/common';
import { StateControl } from '../../services/state-control';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProvisionType } from '../../models/service.model';

@Component({
  selector: 'app-algorithmus',
  imports: [DecimalPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './algorithmus.html',
  styleUrl: './algorithmus.scss',
})
export class Algorithmus {
  algorithmusControl = inject(AlgorithmusControl);
  stateControl = inject(StateControl);
  showEdit: boolean = false;
  algorithmusForm!: FormGroup;

  provisionTypes: { value: ProvisionType; label: string }[] = [
    { value: 'fixed', label: 'Festbetrag' },
    { value: 'percent', label: 'Prozent' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.algorithmusForm = this.fb.group({
      services: this.fb.array([this.createServiceGroup()]),
    });
  }

  // FormArray getter
  get services(): FormArray {    
    return this.algorithmusForm.get('services') as FormArray;
  }

  //Create one service block
  createServiceGroup(): FormGroup {
    const group = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      provision_type: ['', Validators.required],
      amount_fixed: [null],
      amount_percent: [null],
    });


    group.get('provision_type')?.valueChanges.subscribe(() => {
      const index = this.services.controls.indexOf(group);
      if (index > -1) {
        this.updateValidators(index);
      }
    });

    return group;
  }

  isFixed(index: number): boolean {
    return this.services.at(index).get('provision_type')?.value === 'fixed';
  }

  addService(): void {
    this.services.push(this.createServiceGroup());
  }

  private updateValidators(index: number): void {
    const service = this.services.at(index) as FormGroup;

    const fixed = service.get('amount_fixed');
    const percent = service.get('amount_percent');
    const type = service.get('provision_type')?.value as ProvisionType;

    if (!fixed || !percent) return;

    // Clear previous validators
    fixed.clearValidators();
    percent.clearValidators();

    if (type === 'fixed') {
      fixed.setValidators([
        Validators.required,
        Validators.min(0.01),
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]);

      percent.setValue(null, { emitEvent: false });
    }

    if (type === 'percent') {
      percent.setValidators([
        Validators.required,
        Validators.min(0.0001),
        Validators.max(1),
        Validators.pattern(/^\d+(\.\d{1,4})?$/),
      ]);

      fixed.setValue(null, { emitEvent: false });
    }

    fixed.updateValueAndValidity({ emitEvent: false });
    percent.updateValueAndValidity({ emitEvent: false });
  }

  onSubmit(): void {
    if (this.algorithmusForm.invalid) {
      this.algorithmusForm.markAllAsTouched();
    }

    const payload = this.algorithmusForm.getRawValue();
    this.algorithmusControl.updateServices(payload.services).subscribe({
      next: () => {
        this.showConfirmation('Der Kunde wurde erstellt');
      },
      error: (err) => {
        this.showConfirmation('!! Verusche noch einmal');
      },
    });
  }


  showConfirmation(message: string) {
    this.stateControl.displayToast(message);
    this.stateControl.removeShowToast();
  }

  onCancel() {
    this.showEdit = false;
  }

  // Remove container
  removeService(index: number): void {
    this.services.removeAt(index);
  }

  editDetails() {
    this.showEdit = true;
  }
}
