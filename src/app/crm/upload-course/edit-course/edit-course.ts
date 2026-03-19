import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Back } from '../../../shared/back/back';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainStateService } from '../../../main-services/main-state-service';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../main-services/course-service';

@Component({
    selector: 'app-edit-course',
    imports: [CommonModule, Back, ReactiveFormsModule, FormsModule],

    templateUrl: './edit-course.html',
    styleUrl: './edit-course.scss',
})
export class EditCourse {

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
    courseService = inject(CourseService)


    constructor(private route: ActivatedRoute) {

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

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        this.courseService.getCourse(id).subscribe({
            next: (data) => {
                this.mainStateService.displayToast('Die Daten wurden gelesen', true)

                this.mainDataForm.patchValue({
                    name: data.name,
                    order: data.order,
                    badge: data.badge
                });

                this.shortDescriptionForm.patchValue({
                    description: data.description
                });

                this.priceForm.patchValue({
                    price: data.price
                });

                this.featuresForm.patchValue({
                    features: data.features
                });
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })
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
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const payload = {
            price: this.priceForm.value.price,
        }
        this.courseService.updateCourse(id, payload).subscribe({
            next: (data) => {
                this.showPrice = !this.showPrice;
                this.mainStateService.displayToast('Der Prise wurden erfolgreich gespeichert.', true)
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })
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
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const payload = {
            name: this.mainDataForm.value.name,
            order: this.mainDataForm.value.order,
            badge: this.mainDataForm.value.badge
        }
        this.courseService.updateCourse(id, payload).subscribe({
            next: (data) => {
                this.showEdit = !this.showEdit;
                this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true)
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })
    }
}
