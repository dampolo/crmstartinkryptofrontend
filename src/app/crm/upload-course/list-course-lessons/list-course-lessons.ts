import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Back } from '../../../shared/back/back';

@Component({
    selector: 'app-list-course-lessons',
    imports: [RouterLink, Back],
    templateUrl: './list-course-lessons.html',
    styleUrl: './list-course-lessons.scss',
})
export class ListCourseLessons {

    constructor(private route: ActivatedRoute, private router: Router) { }

    addNewVideo() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))

        this.router.navigate(["/crm/kurse", courseId, "add-new-video"])
    }
}
