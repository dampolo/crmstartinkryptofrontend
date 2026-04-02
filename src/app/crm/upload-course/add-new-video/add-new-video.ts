import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Back } from '../../../shared/back/back';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../../main-services/main-state-service';
import { CourseService } from '../../../main-services/course-service';
import { Courses } from '../../../customer/courses';

@Component({
    selector: 'app-add-new-video',
    imports: [Back, ReactiveFormsModule, CommonModule],
    templateUrl: './add-new-video.html',
    styleUrl: './add-new-video.scss',
})
export class AddNewVideo {
    lessonForm: FormGroup;

    mainStateService = inject(MainStateService);
    courseService = inject(CourseService)

    showEdit = false

    constructor(private route: ActivatedRoute, private router: Router) {
        this.lessonForm = new FormGroup({
            title: new FormControl("", Validators.required),
            description: new FormControl("", Validators.required),
            order: new FormControl(0, Validators.required),
            status: new FormControl("draft", Validators.required),
            description_under_video: new FormControl("", Validators.required)
        });
    }

    sumbitMainData() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))
        
        const payload = {
            course: courseId,
            title: this.lessonForm.value.title,
            description: this.lessonForm.value.description,
            order: this.lessonForm.value.order,
            status: this.lessonForm.value.status,
            description_under_video: this.lessonForm.value.description_under_video,
        }



        this.courseService.postLesson(courseId, payload).subscribe({
            next: () => {
                this.mainStateService.displayToast('Die Lektion wurde gespeichert', true)

            },
            error: () => {
                this.mainStateService.displayToast('Versuche es noch einmal.', false)
            }
        })


        console.log(payload);

    }


    editTitle() {
        this.showEdit = !this.showEdit;
    }

    saveTitle() {
        this.showEdit = !this.showEdit;
    }

    backToListOfLessons() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))

        this.router.navigate(["/crm/kurse", courseId, "list-lessons"])
    }


}
