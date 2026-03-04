import { Component, inject, signal } from '@angular/core';
import { LESSON } from '../../../models/course.model';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { DecimalPipe } from '@angular/common';
import { Back } from '../../../shared/back/back';
import { DurationPipe } from '../../../pipes/duration-pipe';

@Component({
    selector: 'app-list-of-lessons',
    imports: [DecimalPipe, Back, RouterLink, DurationPipe, RouterLinkActive],
    templateUrl: './list-of-lessons.html',
    styleUrl: './list-of-lessons.scss',
})
export class ListOfLessons {
    lessons = signal<LESSON[]>([]);
    courseService = inject(CourseService)
    mainStateService = inject(MainStateService);
    constructor(private route: ActivatedRoute,
        private router: Router
    ) { }

    courseId?: number;

    selectedVideo: string | null = null
    description_under_video: string = ""
    title: string = ""
    order: string = ""
    videoDuration: number | null = null;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.courseId = Number(params.get('courseId'));
            const lessonId = Number(params.get('lessonId'));

            this.courseService.getLessons(this.courseId).subscribe({
                next: (data) => {
                    this.lessons.set(data)
                    console.log(data);
                    if (lessonId) {
                        const lesson = data.find(l => l.id === lessonId);

                        if (lesson) {
                            this.loadLesson(lesson);
                        }
                    }
                },
                error: (error: any) => {
                    console.log(error);


                    const message =
                        error?.error?.message ||
                        error?.error?.detail ||
                        "Something went wrong";

                    this.mainStateService.displayToast(message, false);
                }
            });
        })

    }

    selectedLessonId: number | null = null;

    selectLesson(lesson: LESSON) {
        this.selectedLessonId = lesson.id

        this.order = lesson.order
        this.title = lesson.title
        this.selectedVideo = lesson.video;
        this.description_under_video = lesson.description
        this.videoDuration = lesson.duration
    }

    loadLesson(lesson: LESSON) {
        this.selectLesson(lesson);
    }
}
