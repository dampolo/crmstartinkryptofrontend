import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { INVOICE_CUSTOMER } from '../../../models/invoice.model';
import { MainStateService } from '../../../main-services/main-state-service';
import { InvoiceService } from '../../../main-services/invoice-service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environment/environment';

@Component({
    selector: 'app-my-invoices',
    imports: [DatePipe],
    templateUrl: './my-invoices.html',
    styleUrl: './my-invoices.scss',
})
export class MyInvoices {
    invoiceService = inject(InvoiceService);
    mainStateService = inject(MainStateService);
    openMenuId: number | null = null;
    invoices = signal<INVOICE_CUSTOMER[]>([]);
    baseUrl = environment.apiBaseUrl;

    ngOnInit(): void {
        this.invoiceService.getCustomerInvoices().subscribe({
            next: (invoices) => {
                this.invoices.set(invoices);
                console.log(invoices);

            },
            error: (err) => {
                this.mainStateService.displayToast('SystemFehler', false);
            },
        });
    }

    toggleMenu(id: number) {
        this.openMenuId = this.openMenuId === id ? null : id;
    }
}
