import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stateService } from '../../customer/services/state-service';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
  standalone: true,
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {
    mainStateService = inject(MainStateService);

    showToastText: string = '';
}
