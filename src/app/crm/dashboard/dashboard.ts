import { Component, inject, Inject, signal } from '@angular/core';
import { DashboardService } from '../../main-services/dashboard-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '../../main-services/toast-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  dashboardService = inject(DashboardService);
  toastService = inject(ToastService);

  dashboard = toSignal(
    this.dashboardService.getDashboard().pipe(
      tap(() => {
        this.toastService.displayToast(
          'Die Daten wurden geladen.',
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
  );
}
