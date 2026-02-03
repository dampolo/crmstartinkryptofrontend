import { Component, inject } from '@angular/core';
import { stateService } from '../services/state-service';
import { HeaderAuth } from '../header-auth/header-auth';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
  selector: 'app-layout-auth',
  imports: [CommonModule,RouterOutlet, HeaderAuth, Footer],
  templateUrl: './layout-auth.html',
  styleUrl: './layout-auth.scss',
})
export class LayoutAuth {
  mainStateService = inject(MainStateService)
}
