import { Component, inject, signal } from '@angular/core';
import { CustomerControl } from '../services/customer-control';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from "@angular/router";
import { CUSTOMER, CUSTOMER_CRM } from '../../models/customer.model';
import { MainStateService } from '../../main-services/main-state-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
  customerControl = inject(CustomerControl);
  mainStateService = inject(MainStateService);
  openMenuId: number | null = null;

  customers = toSignal(
    this.customerControl.getCustomers().pipe(
      tap(() => {
        this.mainStateService.displayToast(
          'Die Kunden wurden geladen.',
          true
        );
      }),
      catchError(error => {
        this.mainStateService.displayToast(
          'Der Server ist aktuell nicht erreichbar. Bitte versuche es später erneut.',
          false
        );

        return of(null);
      })
    ),
    { initialValue: null }
  )

  toggleMenu(id: number) {
    this.openMenuId = this.openMenuId === id ? null : id;
  }
}
