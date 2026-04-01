import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CourseService } from '../../main-services/course-service';
import { COURSE, PURCHASE } from '../../models/course.model';
import { MainStateService } from '../../main-services/main-state-service';

@Component({
    selector: 'app-all-courses',
    imports: [RouterLink, DecimalPipe],
    templateUrl: './all-courses.html',
    styleUrl: './all-courses.scss',
})
export class AllCourses {

    courseService = inject(CourseService)
    courses = signal<COURSE[]>([])
    purchasedCourses = signal<PURCHASE[]>([])

    mainStateService = inject(MainStateService);

    ngOnInit(): void {
        this.courseService.getCourses().subscribe({
            next: (courses) => {
                this.courses.set(courses)

            },
            error: (err) => {
                this.mainStateService.displayToast('SystemFehler', false);
            }
        })

        this.courseService.getUserCourses().subscribe({
            next: (courses) => {
                this.purchasedCourses.set(courses)
                console.log(courses);

            },
            error: (err) => {
                this.mainStateService.displayToast('SystemFehler', false);
            }
        })
    }

}
