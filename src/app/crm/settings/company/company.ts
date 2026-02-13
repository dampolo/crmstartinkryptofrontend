import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyControl } from '../../services/company-control';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { Logo } from '../../../shared/logo/logo';
import { MainStateService } from '../../../main-services/main-state-service';
import { stateService } from '../../services/state-service';

@Component({
    standalone: true,
    selector: 'app-company',
    imports: [ReactiveFormsModule, CommonModule, Logo],
    templateUrl: './company.html',
    styleUrl: './company.scss',
})
export class Company {
    companyForm: FormGroup;
    companyControl = inject(CompanyControl);
    mainStateService = inject(MainStateService);
    currentYear = new Date().getFullYear();
    showEdit: boolean = false;


    ngOnInit() {
        this.companyControl.getCompany().subscribe({
            next: (data) => {
                this.mainStateService.displayToast('Die Daten wurden gelesen', true)
                console.log(data);
                
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })
    }

    constructor(private fb: FormBuilder) {
        this.companyForm = this.fb.group({
            logo: [null],
            name: [
                '',
                [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!\s*$).+/)],
            ],
            street: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
            street_number: ['', [Validators.required, Validators.pattern(/^[0-9]+[a-zA-Z0-9\/\-]*$/)]],
            postcode: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[0-9]{4,5}$/),
                    Validators.pattern(/^(?!\s*$).+/),
                ],
            ],
            city: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/)]],
            owner_name: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
            tax_number: ['', [Validators.required, Validators.pattern(/^DE[0-9]{9}$/)]],
            bank: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
            bank_account: [
                '',
                [Validators.required, Validators.pattern(/^[A-Z]{2}\d{2}(?: ?[A-Z0-9]){11,30}$/i)],
            ],
            swift_code: [
                '',
                [Validators.required, Validators.pattern(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/i)],
            ],
            founding: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[0-9]{4}$/),
                    Validators.min(1800),
                    Validators.max(this.currentYear),
                ],
            ],
            email: ['', [Validators.required, Validators.email]],
        });

        effect(() => {
            const company = this.companyControl.company();
            if (company) {
                this.companyForm.patchValue({
                    logo: company.logo,
                    name: company.name,
                    street: company.street,
                    street_number: company.street_number,
                    postcode: company.postcode,
                    city: company.city,
                    owner_name: company.owner_name,
                    tax_number: company.tax_number,
                    bank: company.bank,
                    bank_account: company.bank_account,
                    swift_code: company.swift_code,
                    founding: company.founding,
                    email: company.email,
                });
            }
        });
    }

    onCancel() {
        this.showEdit = false;
    }

    editDetails() {
        this.showEdit = true;
        this.companyControl.getCompany();
    }

    submit() {
        if (this.companyForm.invalid) {
            this.companyForm.markAllAsTouched();
            return;
        }
        const formData = this.companyForm.value;
        debugger
        this.companyControl.updateCompany(formData)
            .pipe(switchMap(() => this.companyControl.getCompany()),
                tap(() => {
                    this.showEdit = false;
                    this.mainStateService.displayToast('Firmendaten wurden erfolgreich gespeichert.', true)
                }),
                catchError(err => {
                    this.mainStateService.displayToast('Fehler beim Speichern der Daten.', false)
                    return EMPTY
                })
            )
            .subscribe();
    }
}