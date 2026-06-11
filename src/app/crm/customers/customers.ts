import { Component, inject, signal } from '@angular/core';
import { CustomerControl } from '../services/customer-control';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from "@angular/router";
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '../../main-services/toast-service';

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
  customerControl = inject(CustomerControl);
  toastService = inject(ToastService);
  openMenuId: number | null = null;

  customers = toSignal(
    this.customerControl.getCustomers().pipe(
      tap(() => {
        this.toastService.displayToast(
          'Die Kunden wurden geladen.',
          true
        );
      }),
      catchError(error => {
        this.toastService.displayToast(
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
