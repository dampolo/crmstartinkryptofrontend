import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Back } from '../../../shared/back/back';

@Component({
    selector: 'app-add-new-course',
    imports: [CommonModule, Back],
    templateUrl: './add-new-course.html',
    styleUrl: './add-new-course.scss',
})
export class AddNewCourse {
    showEdit = false

    editTitle() {
        this.showEdit = !this.showEdit;
    }

    saveTitle() {
        this.showEdit = !this.showEdit;
    }


}
