import { Component } from '@angular/core';
import { AppointmentButton } from '../../shared/appointment-button/appointment-button';

@Component({
  selector: 'app-main',
  imports: [AppointmentButton],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
