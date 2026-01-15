import { Component, inject, signal } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { RouterLink, RouterOutlet } from '@angular/router';
import { stateService } from '../services/state-service';
import { InvoiceService } from '../services/invoice-service';

@Component({
  standalone: true,
  selector: 'app-invoices',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices {
  invoiceService = inject(InvoiceService);
  stateService = inject(stateService);
  openMenuId: number | null = null;
  invoices = signal<Invoice[]>([]);

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (invoices) => {
        this.invoices.set(invoices);
        console.log(invoices);
      },
      error: (err) => {
        this.stateService.displayToast('SystemFehler');
      },
    });
  }

  toggleMenu(id: number) {
    this.openMenuId = this.openMenuId === id ? null : id;
  }
}
