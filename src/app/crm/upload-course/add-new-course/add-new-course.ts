import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Back } from '../../../shared/back/back';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../main-services/course-service';
import { ToastService } from '../../../main-services/toast-service';

@Component({
    selector: 'app-add-new-course',
    imports: [CommonModule, Back, ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './add-new-course.html',
    styleUrl: './add-new-course.scss',
})
export class AddNewCourse {
    courseForm: FormGroup;
    courseService = inject(CourseService)
    toastService = inject(ToastService);


    constructor() {
        this.courseForm = new FormGroup({
            name: new FormControl("", Validators.required),
            description: new FormControl("", Validators.required),
            price: new FormControl("", Validators.required),
            order: new FormControl(0, Validators.required),
            badge: new FormControl("", Validators.required),
            status: new FormControl("draft", Validators.required)
        });

    }



    sumbitMainData() {
        const payload = {
            name: this.courseForm.value.name,
            description: this.courseForm.value.description,
            price: this.courseForm.value.price,
            order: this.courseForm.value.order,
            badge: this.courseForm.value.badge,
            status: this.courseForm.value.status,
        }

        this.courseService.postCourse(payload).subscribe({
            next: () => {
                this.toastService.displayToast('Der Kurs wurde gespeichert', true)

            },
            error:  () => {
                this.toastService.displayToast('Versuche es noch einmal.', false)
            }
        })
        
        this.toastService.displayToast('Daten wurden erfolgreich gespeichert.', true)
    }

}
