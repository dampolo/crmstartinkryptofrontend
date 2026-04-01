import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Back } from '../../../shared/back/back';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { LESSON } from '../../../models/course.model';
import { DecimalPipe } from '@angular/common';
import { DurationPipe } from '../../../pipes/duration-pipe';

@Component({
    selector: 'app-list-course-lessons',
    imports: [RouterLink, Back, DecimalPipe, DurationPipe],
    templateUrl: './list-course-lessons.html',
    styleUrl: './list-course-lessons.scss',
})
export class ListCourseLessons {
    lessons = signal<LESSON[]>([]);
    courseService = inject(CourseService)
    mainStateService = inject(MainStateService);

    constructor(private route: ActivatedRoute, private router: Router) { }


    ngOnInit(): void {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))
        this.courseService.getLessonsCrm(courseId).subscribe({
            next: (data) => {
                this.lessons.set(data);
                console.log(data);
                
            },
            error: (error: any) => {
                console.log(error);


                const message =
                    error?.error?.message ||
                    error?.error?.detail ||
                    "Something went wrong";

                this.mainStateService.displayToast(message, false);
            }
        })
    }

    addNewVideo() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))

        this.router.navigate(["/crm/kurse", courseId, "add-new-video"])
    }
}
