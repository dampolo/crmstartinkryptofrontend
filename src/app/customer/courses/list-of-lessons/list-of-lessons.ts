import { Component, inject, signal } from '@angular/core';
import { LESSON } from '../../../models/course.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { DecimalPipe } from '@angular/common';
import { Back } from '../../../shared/back/back';
import { DurationPipe } from '../../../pipes/duration-pipe';

@Component({
    selector: 'app-list-of-lessons',
    imports: [DecimalPipe, Back, RouterLink, DurationPipe],
    templateUrl: './list-of-lessons.html',
    styleUrl: './list-of-lessons.scss',
})
export class ListOfLessons {
    lessons = signal<LESSON[]>([]);
    courseService = inject(CourseService)
    mainStateService = inject(MainStateService);
    constructor(private route: ActivatedRoute) { }

    selectedVideo: string | null = null
    description_under_video: string = ""
    title: string = ""
    order: string = ""
    videoDuration: string | null = null;

    ngOnInit(): void {
        const courseId = Number(this.route.snapshot.paramMap.get('courseId'))
        this.courseService.getLessons(courseId).subscribe({
            next: (data) => {
                this.lessons.set(data)
                console.log(data);
            },
            error: (error: any) => {
                console.log(error);


                const message =
                    error?.error?.message ||
                    error?.error?.detail ||
                    "Something went wrong";

                this.mainStateService.displayToast(message, false);
            }
        })

    }

    selectLesson(order: string, title: string, videoUrl: string | null, description: string, duration: number) {
        this.order = order
        this.title = title
        this.selectedVideo = videoUrl;
        this.description_under_video = description
    }

    formatDuration(seconds: number){
        const minutes = Math.floor(seconds / 60);
        const remaining = seconds % 60;
        return `${minutes}:${remaining.toString().padStart(2, '0')}`;
    }
}
