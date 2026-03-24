import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { ActivatedRoute, Router } from '@angular/router';
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


    constructor(private router: Router, private route: ActivatedRoute) {

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
        this.mainStateService.isEditFeatureVisible = true;

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { featureId: feature.id, featureText: feature.text, featureOrder: feature.order },
        });

        this.editSingleFeature.patchValue({
            order: feature.order,
            text: feature.text,
        })
    }

    ngOnInit() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))

        console.log(courseId);

        this.courseService.getCourse(courseId).subscribe({
            next: (data) => {
                this.mainStateService.displayToast('Die Daten wurden gelesen', true)
                this.features = data.features;
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })

        const featureId = this.route.snapshot.queryParamMap.get("featureId");
        const featureText = this.route.snapshot.queryParamMap.get("featureText");
        const featureOrder = this.route.snapshot.queryParamMap.get("featureOrder");

        if (featureId) {
            this.mainStateService.isEditFeatureVisible = true
            this.editSingleFeature.patchValue({
                order: featureOrder,
                text: featureText,
            })
        }

    }

    submitFeature() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))


        const payload = {
            course: courseId,
            order: this.featuresForm.value.order,
            text: this.featuresForm.value.text,
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
        this.resetPath();
    }



    submitEditSingleFeature() {

        const featureId = Number(this.route.snapshot.queryParamMap.get("featureId"))
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))

        const payload = {
            course: courseId,
            order: this.editSingleFeature.value.order,
            text: this.editSingleFeature.value.text,
        }

        this.courseService.patchFeature(payload, featureId).subscribe({
            next: () => {
                this.mainStateService.isEditFeatureVisible = false;
                this.mainStateService.displayToast('Das Thema wurde geändert.', true)
            },

            error: () => {
                this.mainStateService.displayToast('Versuche es noch einmal.', false)

            }
        })

    }

    resetPath() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { featureId: null, featureText: null, featureOrder: null },
        });
    }


}
