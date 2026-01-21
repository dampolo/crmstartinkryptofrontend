import { Component, inject } from '@angular/core';
import { Back } from '../back/back';
import { RouterLink } from '@angular/router';
import { stateService } from '../../customer/services/state-service';

@Component({
  selector: 'app-confirmation',
  imports: [Back, RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.scss',
})
export class Confirmation {
  stateService = inject(stateService)
}
