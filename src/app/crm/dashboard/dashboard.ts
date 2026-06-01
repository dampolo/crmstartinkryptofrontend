import { Component, inject, Inject, signal } from '@angular/core';
import { DASHBOARD } from '../../models/dashboard.model';
import { DashboardService } from '../../main-services/dashboard-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  dashboardService = inject(DashboardService)

  dashboard = toSignal(
    this.dashboardService.getDashboard(),
    { initialValue: null }
  );
}
