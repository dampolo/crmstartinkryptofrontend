import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InvoiceService } from '../services/invoice-service';
import { INVOICE } from '../../models/invoice.model';
import { environment } from '../../../environment/environment';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
  standalone: true,
  selector: 'app-invoices',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices {
  invoiceService = inject(InvoiceService);
  mainStateService = inject(MainStateService);
  openMenuId: number | null = null;
  invoices = signal<INVOICE[]>([]);
  baseUrl = environment.apiBaseUrl;

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

  toggleMenu(id: number, event: Event):void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  @HostListener('document:click')
  closeMenu(): void {
    this.openMenuId = null;
    
  }
}
