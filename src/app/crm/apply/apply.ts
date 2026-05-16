import { Component, inject } from '@angular/core';
import { ApplicationControl } from '../services/application-control';
import { environment } from '../../../environment/environment';

@Component({
  // standalone: true,
  selector: 'app-apply',
  imports: [],
  templateUrl: './apply.html',
  styleUrl: './apply.scss'
})
export class Apply {
  baseUrl = environment.apiBaseUrl;

  application = inject(ApplicationControl);

}
