import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { INVOICE } from '../../../models/invoice.model';
import { MainStateService } from '../../../main-services/main-state-service';
import { InvoiceService } from '../../../main-services/invoice-service';

@Component({
  selector: 'app-my-invoices',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './my-invoices.html',
  styleUrl: './my-invoices.scss',
})
export class MyInvoices {
  invoiceService = inject(InvoiceService);
  mainStateService = inject(MainStateService);
  openMenuId: number | null = null;
  invoices = signal<INVOICE[]>([]);

    ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (invoices) => {
        this.invoices.set(invoices);
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
