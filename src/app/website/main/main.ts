import { Component } from '@angular/core';
import { AppointmentButton } from '../../shared/appointment-button/appointment-button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  imports: [AppointmentButton, TranslatePipe],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
