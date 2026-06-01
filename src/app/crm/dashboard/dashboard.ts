import { Component, inject, Inject, signal } from '@angular/core';
import { DASHBOARD } from '../../models/dashboard.model';
import { DashboardService } from '../../main-services/dashboard-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MainStateService } from '../../main-services/main-state-service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  dashboardService = inject(DashboardService)
  mainStateService = inject(MainStateService);

  dashboard = toSignal(
    this.dashboardService.getDashboard().pipe(
      tap(() => {
        this.mainStateService.displayToast(
          'Die Daten wurde geladen.',
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
  );
}
