import { Component, inject } from '@angular/core';
import { ApplicationControl } from '../services/application-control';

@Component({
  // standalone: true,
  selector: 'app-apply',
  imports: [],
  templateUrl: './apply.html',
  styleUrl: './apply.scss'
})
export class Apply {

  application = inject(ApplicationControl);

}
