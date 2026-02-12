import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { AlgorithmusControl } from '../../services/algorithmus-control';
import { CommonModule, DecimalPipe } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { stateService } from '../../services/state-service';
import { ProvisionType, ServiceCatalog } from '../../../models/service-catalog.model';
import { MainStateService } from '../../../main-services/main-state-service';

@Component({
  selector: 'app-algorithmus',
  imports: [DecimalPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './algorithmus.html',
  styleUrl: './algorithmus.scss',
})
export class Algorithmus {
  algorithmusControl = inject(AlgorithmusControl);
  mainStateService = inject(MainStateService);
  showEdit: boolean = false;
  algorithmusForm!: FormGroup;
  serviceCatalog = signal<ServiceCatalog[]>([]);

  provisionTypes: { value: ProvisionType; label: string }[] = [
    { value: 'fixed', label: 'Festbetrag' },
    { value: 'percent', label: 'Prozent' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.algorithmusForm = this.fb.group({
      services: this.fb.array([]),
    });

    this.algorithmusControl.getServiceCatalog().subscribe({
      next: (data) => {
        this.serviceCatalog.set(data);
        this.loadServicesIntoForm(data);
        this.mainStateService.displayToast('Die Daten wurden gelesen', true);
      },
      error: (err) => {
        this.mainStateService.displayToast('Du hast kein Internet', false);
      },
    });
  }

  // FormArray getter
  get services(): FormArray {
    return this.algorithmusForm.get('services') as FormArray;
  }

  loadServicesIntoForm(services: ServiceCatalog[]): void {
    services.forEach((service) => {
      this.services.push(this.createServiceGroup(service));
    });
  }

  //Create one service block
  createServiceGroup(service?: Partial<ServiceCatalog>): FormGroup {
    console.log(service);

    const group = this.fb.group({
      id: [service?.id ?? null],
      service_name: [service?.service_name ?? '', [Validators.required, Validators.maxLength(200)]],
      provision_type: [service?.provision_type ?? '', Validators.required],
      provision_fixed: [service?.provision_fixed ?? null],
      provision_percent: [service?.provision_percent ?? null],
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

    const fixed = service.get('provision_fixed');
    const percent = service.get('provision_percent');
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
        Validators.min(0.01),
        Validators.max(10),
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
    console.log(payload.services);
    
    this.algorithmusControl.updateServices(payload.services).subscribe({
      next: () => {
        this.mainStateService.displayToast('Die Leistungen wurden geändert', true);
      },
      error: (err) => {
        this,this.mainStateService.displayToast('!! Verusche noch einmal', false);
      },
    });
  }


  onCancel() {
    this.showEdit = false;
  }

  // Remove container
  // Never use track $index with reactive forms and dynamic rows
  deleteService(service: AbstractControl): void {
    const id = service.get('id')?.value;

    if(id) {
      this.algorithmusControl.deleteService(id).subscribe({
        next: () => {
          this.removeFromForm(service);
          this.mainStateService.displayToast('!!! Der Service wurde gelöscht.', true)
        },
        error: (err: any) => {
          this.mainStateService.displayToast('!!! Versuche noch einmal', false)
        }
      });
    } else {
      this.removeFromForm(service);
    }
  }

  removeFromForm(serivce: AbstractControl): void{
    const index = this.services.controls.indexOf(serivce);
    if(index > -1) {
      this.services.removeAt(index)
    }
  }

  editDetails(): void {
    this.showEdit = true;
  }

}
