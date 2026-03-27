import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Back } from '../../../shared/back/back';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainStateService } from '../../../main-services/main-state-service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-add-new-course',
    imports: [CommonModule, Back, ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './add-new-course.html',
    styleUrl: './add-new-course.scss',
})
export class AddNewCourse {
    courseForm: FormGroup;

    mainStateService = inject(MainStateService);


    constructor() {
        this.courseForm = new FormGroup({
            name: new FormControl(''),
            description: new FormControl("dddd"),
            price: new FormControl(''),
            order: new FormControl(0),
            badge: new FormControl(""),
            status: new FormControl("draft")
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
        console.log(payload);
        
        this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true)
    }

}
