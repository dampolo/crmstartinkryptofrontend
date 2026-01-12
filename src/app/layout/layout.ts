import { Component, inject } from '@angular/core';
import { StateControl } from '../services/state-service';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Toast } from '../shared/toast/toast';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Header, Navbar, RouterOutlet, Toast],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  stateControl = inject(StateControl)
  

}
