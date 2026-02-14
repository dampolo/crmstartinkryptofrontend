import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MainStateService } from '../../../main-services/main-state-service';
import { CourseService } from '../../../main-services/course-service';
import { single } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { COURSE } from '../../../models/course.model';

@Component({
    selector: 'app-payment',
    imports: [CommonModule],
    templateUrl: './payment.html',
    styleUrl: './payment.scss',
})
export class Payment {
    selectedPayment: string = "paypal";
    mainStateService = inject(MainStateService)
    courseService = inject(CourseService)
    discountCode = signal('')
    discountCodeConfirmed: boolean = true
    showConfirmation: boolean = false
    course = signal<COURSE[]>([]);
    constructor(private route: ActivatedRoute) { }

    paymentMethod(method: string) {
        console.log(method);

        this.selectedPayment = method;
    }

    ngOnInit(): void {
        const courseId = Number(this.route.snapshot.paramMap.get('courseId'))
        this.courseService.getCourse(courseId).subscribe({
            next: (data) => {
                this.course.set(data)
                console.log(data);
            },
            error: (err) => {
                this.mainStateService.displayToast('Systemfehler', false)
            }
        })
    }

    checkDiscountCode(code: string) {
        this.showConfirmation = true;
        this.courseService.DiscountCode(code).subscribe({
            next: () => {
                this.discountCodeConfirmed = true;
                this.discountCode.set(code);
            },
            error: () => {
                this.discountCodeConfirmed = false;
                this.discountCode.set(code);
            }
        })

    }

}
