import { Component, inject } from '@angular/core';
import { HeaderAuth } from '../header-auth/header-auth';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../main-services/main-state-service';
import { Toast } from '../../shared/toast/toast';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-layout-auth',
  imports: [CommonModule,RouterOutlet, HeaderAuth, Footer, Toast],
  templateUrl: './layout-auth.html',
  styleUrl: './layout-auth.scss',
})
export class LayoutAuth {
  mainStateService = inject(MainStateService)
}
