import { Component, inject } from '@angular/core';
import { stateService } from '../../crm/services/state-service';
import { Back } from '../back/back';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  imports: [Back, RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.scss',
})
export class Confirmation {
  stateService = inject(stateService)
}
