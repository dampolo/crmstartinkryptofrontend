import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { stateService } from './services/state-service';
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
  stateService = inject(stateService);

  constructor(private router: Router, private auth: AuthService) {
    
  }
  
}
