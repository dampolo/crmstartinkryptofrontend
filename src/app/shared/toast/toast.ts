import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateControl } from '../../services/state-service';

@Component({
  standalone: true,
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {
    stateControl = inject(StateControl);

    showToastText: string = '';
}
