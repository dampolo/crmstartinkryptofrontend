import { Component } from '@angular/core';
import { AppointmentButton } from '../../shared/appointment-button/appointment-button';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-main',
  imports: [AppointmentButton, TranslatePipe, RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
