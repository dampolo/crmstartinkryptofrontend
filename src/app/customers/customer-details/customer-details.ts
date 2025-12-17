import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CUSTOMER } from '../../models/customer.model';
import { CustomerControl } from '../../services/customer-control';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  imports: [DatePipe],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.scss',
})
export class CustomerDetails {
  customerControl = inject(CustomerControl);
  customer?: CUSTOMER;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.customerControl.getCustomerById(id).subscribe({
      next: (data:any) => {
        console.log(data);
        
        this.customer = data;
      },
      error: (err:any) => {
        console.error('Customer not found', err);
        
      }
  })
  }

}
