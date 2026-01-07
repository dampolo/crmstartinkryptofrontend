import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { InvoiceService } from '../services/invoice-service';
import { StateControl } from '../services/state-control';
import { Invoice } from '../models/invoice.model';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-invoices',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices {
  invoiceService = inject(InvoiceService);
  stateControl = inject(StateControl);
  openMenuId: number | null = null;
  invoices = signal<Invoice[]>([]);

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (invoices) => {
        this.invoices.set(invoices);
        console.log(invoices);
      },
      error: (err) => {
        this.stateControl.displayToast('SystemFehler');
      },
    });
  }

  toggleMenu(id: number) {
    this.openMenuId = this.openMenuId === id ? null : id;
  }
}
