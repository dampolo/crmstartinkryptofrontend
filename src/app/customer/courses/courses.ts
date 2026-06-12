import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, single } from 'rxjs';
import { CourseService } from '../../main-services/course-service';
import { DecimalPipe } from '@angular/common';
import { AuthService } from '../../main-services/auth-service';
import { ToastService } from '../../main-services/toast-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-courses',
    imports: [DecimalPipe],
    templateUrl: './courses.html',
    styleUrl: './courses.scss',
})
export class Courses {
    courseService = inject(CourseService)
    toastService = inject(ToastService);
    authService = inject(AuthService);

    constructor(private router: Router) { }

    courses = toSignal(
        this.courseService.getCourses().pipe(
            catchError(() => {
                this.toastService.displayToast('SystemFehler', false);
                return of([]);
            })
        ),
        { initialValue: [] }
    );

    buyCourse(courseId: number) {
        this.authService.checkAuth().subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                this.router.navigate([
                    'customer/courses/payment',
                    courseId
                ]);
            } else {
                this.router.navigate([
                    'kurse/information',
                ]);
            }
        });
    }
}

