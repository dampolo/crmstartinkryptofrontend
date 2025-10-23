import { Component } from '@angular/core';
import { Invoice } from '../shared/invoice/invoice';

@Component({
  standalone: true,
  selector: 'app-invoices',
  imports: [Invoice],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss'
})
export class Invoices {

}
