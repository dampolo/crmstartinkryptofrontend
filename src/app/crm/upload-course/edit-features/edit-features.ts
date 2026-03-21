import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { ActivatedRoute } from '@angular/router';
import { COURSE_FEATURE } from '../../../models/course.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

    featuresForm: FormGroup;


    constructor(private route: ActivatedRoute) {

        this.featuresForm = new FormGroup({
            text: new FormControl("", Validators.required),
            order: new FormControl(0, Validators.required)
        });

    }

    editFeatures() { }

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

    }


}
