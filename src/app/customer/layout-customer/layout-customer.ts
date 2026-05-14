import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderCustomer } from '../header-customer/header-customer';
import { NavbarCustomer } from '../navbar-customer/navbar-customer';
import { Toast } from '../../shared/toast/toast';
import { MainStateService } from '../../main-services/main-state-service';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-layout-customer',
  imports: [CommonModule, HeaderCustomer, NavbarCustomer, RouterOutlet, Toast, Footer],
  templateUrl: './layout-customer.html',
  styleUrl: './layout-customer.scss',
})
export class LayoutCustomer {
  mainStateService = inject(MainStateService)
}
