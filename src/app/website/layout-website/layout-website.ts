import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-website',
  imports: [CommonModule, RouterOutlet, Header, Footer],
  templateUrl: './layout-website.html',
  styleUrl: './layout-website.scss',
})
export class LayoutWebsite {

}
