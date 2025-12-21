import { Component, inject, OnInit } from '@angular/core';
import { AlgorithmusControl } from '../../services/algorithmus-control';
import { CommonModule, DecimalPipe } from '@angular/common';
import { StateControl } from '../../services/state-control';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type ProvisionType = 'FIXED' | 'PERCENT';

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
    { value: 'FIXED', label: 'Fixed amount' },
    { value: 'PERCENT', label: 'Percent' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.algorithmusForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      provision_type: ['FIXED', Validators.required],
      amount_fixed: [null],
      amount_percent: [null],
    });

    // React to provision type changes
    this.algorithmusForm.get('provision_type')?.valueChanges.subscribe((type: ProvisionType) => {
      this.updateValidators(type);
    });

    // Initial validator setup
    this.updateValidators(this.algorithmusForm.get('provision_type')?.value);
  }

  get isFixed(): boolean {
    return this.algorithmusForm.get('provision_type')?.value === 'FIXED';
  }

  
  private updateValidators(type: ProvisionType): void {
    const fixed = this.algorithmusForm.get('amount_fixed');
    const percent = this.algorithmusForm.get('amount_percent');

    if (!fixed || !percent) return;

    // Clear previous validators
    fixed.clearValidators();
    percent.clearValidators();

    if (type === 'FIXED') {
      fixed.setValidators([
        Validators.required,
        Validators.min(0.01),
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]);

      percent.setValue(null, { emitEvent: false });
    }

    if (type === 'PERCENT') {
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

  onSubmit() {}

  onCancel() {
    this.showEdit = false;
  }

  editDetails() {
    this.showEdit = true;
  }
}
