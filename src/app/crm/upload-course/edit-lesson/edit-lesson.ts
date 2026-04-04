import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Back } from '../../../shared/back/back';

@Component({
    selector: 'app-edit-lesson',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, Back],
    templateUrl: './edit-lesson.html',
    styleUrl: './edit-lesson.scss',
})
export class EditLesson {

    showEdit = true;
    showLongDescription = true;
    showShortDescription = true;

    showPrice = true;
    showStatus = true


    statusForm: FormGroup;
    mainDataForm: FormGroup;

    shortDescriptionForm: FormGroup
    longDescriptionForm: FormGroup

    // features: COURSE_FEATURE[] = []
    priceForm: FormGroup

    mainStateService = inject(MainStateService);
    courseService = inject(CourseService)

    constructor(private route: ActivatedRoute, private router: Router) {

        // Status
        this.statusForm = new FormGroup({
            status: new FormControl("draft")
        })

        this.mainDataForm = new FormGroup({
            name: new FormControl(''),
            order: new FormControl(0),
        });

        this.shortDescriptionForm = new FormGroup({
            short_description: new FormControl("short")
        })

        this.longDescriptionForm = new FormGroup({
            long_description: new FormControl("short")
        })

        this.priceForm = new FormGroup({
            price: new FormControl('')
        });
    }

    editMainData() { }

    sumbitMainData() { }

    editStatus() { }

    submitStatus() { }

    submitShortDescription() { }

    editShortDescription() { }
    
    submitLongDescription() { }
    
    editLongDescription() {}
}
