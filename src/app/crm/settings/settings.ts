import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {

}
