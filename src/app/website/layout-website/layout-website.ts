import { Component, HostListener, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Toast } from '../../shared/toast/toast';
import { Footer } from '../../shared/footer/footer';
import { ToastService } from '../../main-services/toast-service';

@Component({
  selector: 'app-layout-website',
  imports: [CommonModule, RouterOutlet, Header, Footer, Toast],
  templateUrl: './layout-website.html',
  styleUrl: './layout-website.scss',
})
export class LayoutWebsite {
  toastService = inject(ToastService);

}
