import { Component, inject } from '@angular/core';
import { AlgorithmusControl } from '../../services/algorithmus-control';
import { CompanyControl } from '../../services/company-control';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-invoice',
  imports: [],
  templateUrl: './invoice.html',
  styleUrl: './invoice.scss'
})
export class Invoice {

  algorithmusControl = inject(AlgorithmusControl)
  companyControl = inject(CompanyControl)
  currentDate = new Date(); // stores the current date and time

   ngOnInit() {
    this.companyControl.getCompany().subscribe()
  }

}
