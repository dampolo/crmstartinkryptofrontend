import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Back } from '../../../shared/back/back';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainStateService } from '../../../main-services/main-state-service';

@Component({
    selector: 'app-add-new-course',
    imports: [CommonModule, Back, ReactiveFormsModule, FormsModule],
    templateUrl: './add-new-course.html',
    styleUrl: './add-new-course.scss',
})
export class AddNewCourse {
    showEdit = true;
    statusForm: FormGroup;
    mainData: FormGroup;
    mainStateService = inject(MainStateService);


    constructor() {

        // Status
        this.statusForm = new FormGroup({
            status: new FormControl("draft")
        })

        this.mainData = new FormGroup({
            title: new FormControl(''),
            order: new FormControl(0),
            badge: new FormControl('')

        });
    }

    editTitle() {
        this.showEdit = !this.showEdit;
    }

    saveTitle() {
    }

    onSubmit() {
        this.mainStateService.displayToast('Status wurde erfolgreich gespeichert.', true)

    }

    saveStatus() {

    }

    sumbitMainData() {        
        this.showEdit = !this.showEdit;
        this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true)
    }
}
