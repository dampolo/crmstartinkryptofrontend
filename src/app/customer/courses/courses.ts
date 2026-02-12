import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { single } from 'rxjs';
import { COURSE } from '../../models/course.model';
import { CourseService } from '../../main-services/course-service';
import { MainStateService } from '../../main-services/main-state-service';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../environment/environment';

@Component({
    selector: 'app-courses',
    imports: [DecimalPipe],
    templateUrl: './courses.html',
    styleUrl: './courses.scss',
})
export class Courses {
    courseService = inject(CourseService)
    courses = signal<COURSE[]>([])
    mainStateService = inject(MainStateService);

    ngOnInit(): void {
        this.courseService.getCourses().subscribe({
            next: (courses) => {
                this.courses.set(courses)
                console.log(courses);
                
            },
            error: (err) => {
                this.mainStateService.displayToast('SystemFehler', false);
            }
        })
    }

    buyCourse(id: number) {
        this.courseService.buyCourse(id).subscribe({
            next: () => {
                this.mainStateService.displayToast('Der Kurs wurde gekauft', true);
            },
            error: (err) => {
                console.log(err);
                
                const message = err?.error?.message || 'Kauf fehlgeschlagen';
                this.mainStateService.displayToast(message, false);
            }
        })
    }
}
