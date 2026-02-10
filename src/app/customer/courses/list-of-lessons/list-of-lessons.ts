import { Component, inject, signal } from '@angular/core';
import { LESSON } from '../../../models/course.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { DecimalPipe } from '@angular/common';
import { Back } from '../../../shared/back/back';

@Component({
  selector: 'app-list-of-lessons',
  imports: [DecimalPipe, Back, RouterLink],
  templateUrl: './list-of-lessons.html',
  styleUrl: './list-of-lessons.scss',
})
export class ListOfLessons {
    lessons = signal<LESSON[]>([]);
    courseService = inject(CourseService)
    mainStateService = inject(MainStateService);    
    constructor(private route: ActivatedRoute){}

    ngOnInit(): void {
      const courseId = Number(this.route.snapshot.paramMap.get('courseId'))
      this.courseService.getLessons(courseId).subscribe({
        next: (data) => {
          this.lessons.set(data)
          console.log(data);
        },
        error: (err) => {
          this.mainStateService.displayToast('Systemfehler', false)
        }
      })
    }
}
