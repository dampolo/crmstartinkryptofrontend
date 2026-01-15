import { Component, inject } from '@angular/core';
import { stateService } from '../../crm/services/state-service';
import { Toast } from '../../crm/shared/toast/toast';
import { CommonModule } from '@angular/common';
import { Header } from '../../crm/header/header';
import { Navbar } from '../../crm/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Header, Navbar, RouterOutlet, Toast],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  stateService = inject(stateService)
}
