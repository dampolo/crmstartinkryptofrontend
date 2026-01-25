import { Component, inject } from '@angular/core';
import { stateService } from '../../crm/services/state-service';
import { Toast } from '../../crm/shared/toast/toast';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderCustomer } from '../header-customer/header-customer';
import { NavbarCustomer } from '../navbar-customer/navbar-customer';

@Component({
  selector: 'app-layout-customer',
  imports: [CommonModule, HeaderCustomer, NavbarCustomer, RouterOutlet, Toast],
  templateUrl: './layout-customer.html',
  styleUrl: './layout-customer.scss',
})
export class LayoutCustomer {
  stateService = inject(stateService)
}
