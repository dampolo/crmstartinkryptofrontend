import { Component, inject } from '@angular/core';
import { AlgorithmusControl } from '../../services/algorithmus-control';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CompanyControl } from '../../services/company-control';

@Component({
  selector: 'app-invoice',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './invoice.html',
  styleUrl: './invoice.scss'
})
export class Invoice {

  algorithmusControl = inject(AlgorithmusControl)
  companyControl = inject(CompanyControl)
  currentDate = new Date(); // stores the current date and time

}
