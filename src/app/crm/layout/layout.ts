import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Toast } from '../../shared/toast/toast';
import { MainStateService } from '../../main-services/main-state-service';
import { HeaderCrm } from "../header-crm/header-crm";

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Navbar, RouterOutlet, Toast, HeaderCrm],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  mainStateService = inject(MainStateService)
  

}
