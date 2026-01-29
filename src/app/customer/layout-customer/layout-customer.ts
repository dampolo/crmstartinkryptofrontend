import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderCustomer } from '../header-customer/header-customer';
import { NavbarCustomer } from '../navbar-customer/navbar-customer';
import { stateService } from '../services/state-service';
import { Toast } from '../../shared/toast/toast';

@Component({
  selector: 'app-layout-customer',
  imports: [CommonModule, HeaderCustomer, NavbarCustomer, RouterOutlet, Toast],
  templateUrl: './layout-customer.html',
  styleUrl: './layout-customer.scss',
})
export class LayoutCustomer {
  stateService = inject(stateService)
}
