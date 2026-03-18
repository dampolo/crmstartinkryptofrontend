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
    showDescription = true;
    showPrice = true;
    showStatus = true


    statusForm: FormGroup;
    mainDataForm: FormGroup;

    shortDescriptionForm: FormGroup
    featuresForm: FormGroup
    priceForm: FormGroup

    mainStateService = inject(MainStateService);


    constructor() {

        // Status
        this.statusForm = new FormGroup({
            status: new FormControl("draft")
        })

        this.mainDataForm = new FormGroup({
            name: new FormControl(''),
            order: new FormControl(0),
            badge: new FormControl("")

        });

        this.shortDescriptionForm = new FormGroup({
            description: new FormControl("dddd")
        })

        this.featuresForm = new FormGroup({
            features: new FormControl("")
        })

        this.priceForm = new FormGroup({
            price: new FormControl('')
        });


    }

    editDescription() {
        this.showDescription = !this.showDescription
    }

    submitDescription() {
        this.showDescription = !this.showDescription
        this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true)

    }

    editPrice() {
        this.showPrice = !this.showPrice
    }

    submitPrice() {
        this.showPrice = !this.showPrice
        this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true)

    }
    editStatus() {
        this.showStatus = !this.showStatus;
    }

    submitStatus() {
        this.showStatus = !this.showStatus;
        this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true)
    }

    editMainData() {
        this.showEdit = !this.showEdit;
    }

    sumbitMainData() {
        this.showEdit = !this.showEdit;
        this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true)
    }

}
