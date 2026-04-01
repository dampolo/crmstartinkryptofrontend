import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Back } from '../../../shared/back/back';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-new-video',
    imports: [Back, ReactiveFormsModule, CommonModule],
    templateUrl: './add-new-video.html',
    styleUrl: './add-new-video.scss',
})
export class AddNewVideo {

    showEdit = false

    constructor(private route: ActivatedRoute, private router: Router) {}

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
