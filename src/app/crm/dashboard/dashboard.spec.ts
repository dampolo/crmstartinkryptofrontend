import { of, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { DashboardService } from '../../main-services/dashboard-service';
import { MainStateService } from '../../main-services/main-state-service';
import { DASHBOARD } from '../../models/dashboard.model';
import { ToastService } from '../../main-services/toast-service';

describe('Dashboard', () => {
  let fixture: ComponentFixture<Dashboard>;
  let component: Dashboard;

  let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;


  const mockDashboard: DASHBOARD = {
    customers_count: 10,
    applicants_count: 5,
    invioces_count: 3,
    latest_customers: [],
    latest_applicants: [],
    latest_invoices: []
  };

  beforeEach(async () => {
    dashboardServiceSpy = jasmine.createSpyObj('DashboardService', [
      'getDashboard'
    ]);

    toastServiceSpy = jasmine.createSpyObj('ToastService', [
      'displayToast'
    ]);

    dashboardServiceSpy.getDashboard.and.returnValue(
      of(mockDashboard)
    );

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        {
          provide: DashboardService,
          useValue: dashboardServiceSpy
        },
        {
          provide: ToastService,
          useValue: toastServiceSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component crm dashboard', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load dashboard data and display success toast on init', () => {
    expect(component.dashboard()).toEqual(mockDashboard);
    expect(component.dashboard()?.customers_count).toBe(10);
    expect(component.dashboard()?.applicants_count).toBe(5);
    expect(component.dashboard()?.invioces_count).toBe(3);
    expect(dashboardServiceSpy.getDashboard).toHaveBeenCalledTimes(1);
    expect(toastServiceSpy.displayToast).toHaveBeenCalledTimes(1);
    expect(toastServiceSpy.displayToast).toHaveBeenCalledWith(
      'Die Daten wurden geladen.',
      true
    );
  });

  it('should handle error and display error toast', () => {
    toastServiceSpy.displayToast.calls.reset();
    
    dashboardServiceSpy.getDashboard.and.returnValue(
      throwError(() => new Error('Server Error'))
    );

    const errorFixture = TestBed.createComponent(Dashboard);
    const errorComponent = errorFixture.componentInstance;

    errorFixture.detectChanges();

    expect(errorComponent.dashboard()).toBeNull();

    expect(toastServiceSpy.displayToast).toHaveBeenCalledWith(
      'Der Server ist aktuell nicht erreichbar. Bitte versuche es später erneut.',
      false
    );
  });
});