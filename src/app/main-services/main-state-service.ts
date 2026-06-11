import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainStateService {
  isMenuOpen = signal(false)
  isProfileVisible: boolean = false;
  showPreloader: boolean = false;
  
  // Open the dialog when you can edit a feature
  isEditFeatureVisible = signal(false);
  showConfirmationText = signal('');
  showConfirmationLink = signal('');
}
