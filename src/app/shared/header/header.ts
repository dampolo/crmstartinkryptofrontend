import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { AppointmentButton } from '../appointment-button/appointment-button';
import { MainStateService } from '../../main-services/main-state-service';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [CommonModule, AppointmentButton, TranslatePipe, RouterLink],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    posFixBurger = false;
    posFixLogo = false;
    isMenuOpen = false;
    isLanguagesOpen = false;
    selectedLanguage: string = 'de';
    mainStateService = inject(MainStateService);
    private translate = inject(TranslateService);

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


    openLanguages() {
        this.isLanguagesOpen = !this.isLanguagesOpen;

    }


    changeLanguage(language: string) {
        this.selectedLanguage = language;
        this.isLanguagesOpen = false
        this.translate.use(language);
    }
}
