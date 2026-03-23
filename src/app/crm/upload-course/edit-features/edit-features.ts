import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { ActivatedRoute } from '@angular/router';
import { COURSE_FEATURE } from '../../../models/course.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CUSTOMER_CRM } from '../../../models/customer.model';

@Component({
    selector: 'app-edit-features',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './edit-features.html',
    styleUrl: './edit-features.scss',
})
export class EditFeatures {
    showEdit = true;

    features: COURSE_FEATURE[] = []

    mainStateService = inject(MainStateService);
    courseService = inject(CourseService)
    editSingleFeature: FormGroup

    featuresForm: FormGroup;


    constructor(private route: ActivatedRoute) {

        this.featuresForm = new FormGroup({
            text: new FormControl("", Validators.required),
            order: new FormControl(0, Validators.required)
        });

        this.editSingleFeature = new FormGroup({
            text: new FormControl("", Validators.required),
            order: new FormControl(0, Validators.required)
        });
    }

    editFeature(feature: COURSE_FEATURE) {
        this.mainStateService.isEditFeatureVisible = true
        this.editSingleFeature.patchValue({
            order: feature.order,
            text: feature.text,
        })
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        this.courseService.getCourse(id).subscribe({
            next: (data) => {
                this.mainStateService.displayToast('Die Daten wurden gelesen', true)
                this.features = data.features;
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })
    }

    submitFeature() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const payload = {
            course: id,
            text: this.featuresForm.value.text,
            order: this.featuresForm.value.order
        }

        this.courseService.postFeature(payload).subscribe({
            next: (data) => {
                this.mainStateService.displayToast('Das Thema wurden hinzugefügt', true)
                this.featuresForm.reset()
                this.ngOnInit()
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })
    }

    deleteFeature(featureId: number) {
        console.log(featureId);

        this.courseService.deleteFeature(featureId).subscribe({
            next: () => {
                this.ngOnInit()
            },

            error: () => {
                this.mainStateService.displayToast('Versuche es noch einmal.', false)

            }
        })

    }

    closeDialog() {
        this.mainStateService.isEditFeatureVisible = false;
    }



    submitEditSingleFeature() {
                this.courseService.deleteFeature(88).subscribe({
            next: () => {
                this.ngOnInit()
            },

            error: () => {
                this.mainStateService.displayToast('Versuche es noch einmal.', false)

            }
        })

    }
}
