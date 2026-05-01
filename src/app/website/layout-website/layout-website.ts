import { Component, HostListener, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainStateService } from '../../main-services/main-state-service';
import { Toast } from '../../shared/toast/toast';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-layout-website',
  imports: [CommonModule, RouterOutlet, Header, Footer, Toast],
  templateUrl: './layout-website.html',
  styleUrl: './layout-website.scss',
})
export class LayoutWebsite {
      mainStateService = inject(MainStateService);

}
