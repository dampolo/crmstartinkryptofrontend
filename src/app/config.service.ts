import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private cfg: any;

  async load() {
    const res = await fetch('/config.json');
    this.cfg = await res.json();
  }

  get apiUrl() {
    return this.cfg?.apiUrl ?? '';
  }
}
