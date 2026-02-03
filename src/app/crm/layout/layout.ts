import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Toast } from '../shared/toast/toast';
import { stateService } from '../services/state-service';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Header, Navbar, RouterOutlet, Toast],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  stateService = inject(stateService)
  

}
