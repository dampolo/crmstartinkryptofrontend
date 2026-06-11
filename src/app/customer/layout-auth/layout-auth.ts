import { Component, inject } from '@angular/core';
import { HeaderAuth } from '../header-auth/header-auth';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Toast } from '../../shared/toast/toast';
import { Footer } from '../../shared/footer/footer';
import { ToastService } from '../../main-services/toast-service';

@Component({
  selector: 'app-layout-auth',
  imports: [CommonModule,RouterOutlet, HeaderAuth, Footer, Toast],
  templateUrl: './layout-auth.html',
  styleUrl: './layout-auth.scss',
})
export class LayoutAuth {
  toastService = inject(ToastService);
}
