import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { stateService } from '../services/state-service';
import { Toast } from '../../shared/toast/toast';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Header, Navbar, RouterOutlet, Toast],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  mainStateService = inject(MainStateService)
  

}
