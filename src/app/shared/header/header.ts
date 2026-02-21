import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { AppointmentButton } from '../appointment-button/appointment-button';
import { MainStateService } from '../../main-services/main-state-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [CommonModule, AppointmentButton, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  posFixBurger = false;
  posFixLogo = false;
  isMenuOpen = false;
  mainStateService = inject(MainStateService);
  private isShiftTab = false;

  @ViewChildren('navLink') navLinks!: QueryList<ElementRef>;

  openMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.posFixBurger = !this.posFixBurger;
    this.posFixLogo = !this.posFixLogo;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.posFixBurger = false;
    this.posFixLogo = false;
  }


}
