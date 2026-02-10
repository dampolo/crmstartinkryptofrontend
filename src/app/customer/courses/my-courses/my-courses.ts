import { Component, inject, signal } from '@angular/core';
import { COURSE, LESSON, PURCHASE, PURCHASED_COURSE } from '../../../models/course.model';
import { MainStateService } from '../../../main-services/main-state-service';
import { CourseService } from '../../../main-services/course-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-courses',
    imports: [],
    templateUrl: './my-courses.html',
    styleUrl: './my-courses.scss',
})
export class MyCourses {
    courseService = inject(CourseService)
    courses = signal<PURCHASE[]>([])
    mainStateService = inject(MainStateService);
    lessons = signal<LESSON[]>([]);

    constructor(private router: Router){}

    ngOnInit(): void {
        this.courseService.getUserCourses().subscribe({
            next: (courses) => {
                this.courses.set(courses)
                console.log(courses);

            },
            error: (err) => {
                this.mainStateService.displayToast('SystemFehler', false);
            }
        })
    }

    openCourse(courseId: number) {
      this.router.navigate([
        'customer/my-courses/list-of-lessons', courseId
      ])
    }
}
