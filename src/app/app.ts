import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StateControl } from './services/state-control';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth-service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('crmstartinkryptofrontend');
  stateControl = inject(StateControl);

  constructor(private router: Router, private auth: AuthService) {
    
  }
  
}
