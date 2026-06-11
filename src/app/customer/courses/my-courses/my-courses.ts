import { Component, inject, signal } from '@angular/core';
import { COURSE, LESSON, PURCHASE, PURCHASED_COURSE } from '../../../models/course.model';
import { MainStateService } from '../../../main-services/main-state-service';
import { CourseService } from '../../../main-services/course-service';
import { Router, RouterLink } from '@angular/router';
import { Back } from '../../../shared/back/back';
import { ToastService } from '../../../main-services/toast-service';

@Component({
    selector: 'app-my-courses',
    imports: [Back, RouterLink],
    templateUrl: './my-courses.html',
    styleUrl: './my-courses.scss',
})
export class MyCourses {
    courseService = inject(CourseService)
    toastService = inject(ToastService);
    courses = signal<PURCHASE[]>([])
    lessons = signal<LESSON[]>([]);

    constructor(private router: Router){}

    ngOnInit(): void {
        this.courseService.getUserCourses().subscribe({
            next: (courses) => {
                this.courses.set(courses)
                console.log(courses);

            },
            error: (err) => {
                this.toastService.displayToast('SystemFehler', false);
            }
        })
    }

    openCourse(courseId: number) {
      this.router.navigate([
        'customer/my-courses/', courseId, 'list-of-lessons'
      ])
    }
}
