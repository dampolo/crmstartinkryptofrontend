import { Component } from '@angular/core';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-preloader',
  imports: [Logo],
  templateUrl: './preloader.html',
  styleUrl: './preloader.scss',
})
export class Preloader {

}
