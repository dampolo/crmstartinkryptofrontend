import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare global {
  interface Window {
    TidyCal?: { init?: (el: HTMLElement) => void };
  }
}

@Component({
  selector: 'app-termin',
  imports: [],
  templateUrl: './termin.html',
  styleUrl: './termin.scss',
})

export class Termin {

  @ViewChild('tidycal', { static: false }) tidycalEl!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.initTidycal();
  }

  private initTidycal() {
    const el = this.tidycalEl.nativeElement;

    // If the script is async, it might not be ready yet
    const tryInit = () => {
      if (window.TidyCal?.init) {
        window.TidyCal.init(el); // 👈 element provided (fixes your error)
        return true;
      }
      return false;
    };

    if (tryInit()) return;

    // wait briefly for the async script to finish loading
    const maxTries = 50; // ~5 seconds if interval is 100ms
    let tries = 0;
    const t = setInterval(() => {
      tries++;
      if (tryInit() || tries >= maxTries) clearInterval(t);
    }, 100);
  }
}
