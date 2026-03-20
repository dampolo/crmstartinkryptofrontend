import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Back } from '../../../shared/back/back';

@Component({
  selector: 'app-list-course-lessons',
  imports: [RouterLink, Back],
  templateUrl: './list-course-lessons.html',
  styleUrl: './list-course-lessons.scss',
})
export class ListCourseLessons {

}
