import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../../main-services/main-state-service';
import { CourseService } from '../../../main-services/course-service';
import { Back } from '../../../shared/back/back';
import { LESSON_PDF } from '../../../models/course.model';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Component({
    selector: 'app-add-new-lesson',
    imports: [ReactiveFormsModule, CommonModule, Back],
    templateUrl: './add-new-lesson.html',
    styleUrl: './add-new-lesson.scss',
})
export class AddNewLesson {
    lessonForm: FormGroup;

    mainStateService = inject(MainStateService);
    courseService = inject(CourseService);
    showEdit = false;

    lessonId$!: Observable<number | null>;
    lessonId: number | null = null;

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
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));

        const payload = {
            course: courseId,
            title: this.lessonForm.value.title,
            description: this.lessonForm.value.description,
            order: this.lessonForm.value.order,
            status: this.lessonForm.value.status,
            description_under_video: this.lessonForm.value.description_under_video,
        };

        this.lessonId$ = this.courseService.postLesson(courseId, payload).pipe(
            map(res => res.id),
            tap(id => {
                this.lessonId = id;
            }),
            tap(() => {
                this.mainStateService.displayToast('Die Lektion wurde gespeichert', true);
            }),
            catchError((err) => {
                this.mainStateService.displayToast('Versuche es noch einmal.', false);
                return of(null);
            })
        );
    }


    editTitle() {
        this.showEdit = !this.showEdit;
    }

    saveTitle() {
        this.showEdit = !this.showEdit;
    }

    backToListOfLessons() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))

        this.router.navigate(["/crm/kurse", courseId, "list-of-lessons"])
    }

    addVideo() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))
        console.log(this.lessonId);
        
        this.router.navigate(["/crm/kurse", courseId, "add-new-lesson", this.lessonId, "upload-video"])
    }

}
