import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

// declare global {
//   interface Window {
//     TidyCal?: { init: (el?: Element) => void };
//   }
// }

@Component({
    selector: 'app-termin',
    imports: [],
    templateUrl: './termin.html',
    styleUrl: './termin.scss',
})

export class Termin {
  // @ViewChild('tidycalHost', { static: false }) tidycalHost!: ElementRef<HTMLElement>;

  // ngAfterViewInit(): void {
  //   this.initTidyCalWhenReady();
  // }

  // private initTidyCalWhenReady(): void {
  //   const host = this.tidycalHost?.nativeElement;
  //   if (!host) return;

  //   const tryInit = () => {
  //     // init ONLY this embed container
  //     if (window.TidyCal?.init) {
  //       window.TidyCal.init(host);
  //       return true;
  //     }
  //     return false;
  //   };

  //   // Try immediately
  //   if (tryInit()) return;

  //   // If script is still loading (because async), poll briefly until available
  //   const started = Date.now();
  //   const timer = window.setInterval(() => {
  //     if (tryInit() || Date.now() - started > 5000) {
  //       window.clearInterval(timer);
  //     }
  //   }, 50);
  // }
}
