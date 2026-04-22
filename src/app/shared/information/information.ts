import { Component, inject } from '@angular/core';
import { Back } from '../back/back';
import { MainStateService } from '../../main-services/main-state-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-information',
  imports: [Back, RouterLink],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information {
  mainStateService = inject(MainStateService)

}
