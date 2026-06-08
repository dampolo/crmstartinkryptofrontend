import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CourseService } from '../../main-services/course-service';
import { COURSE, PURCHASE } from '../../models/course.model';
import { MainStateService } from '../../main-services/main-state-service';
import { catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-all-courses',
    imports: [RouterLink, DecimalPipe],
    templateUrl: './all-courses.html',
    styleUrl: './all-courses.scss',
})
export class AllCourses {
    courseService = inject(CourseService)
    purchasedCourses = signal<PURCHASE[]>([])
    mainStateService = inject(MainStateService);

    courses = toSignal(
        this.courseService.getCourses().pipe(
            catchError((err) => {
                this.mainStateService.displayToast('SystemFehler', false);
                return of([]);
            })
        ),
        { initialValue: [] }
    );

}
