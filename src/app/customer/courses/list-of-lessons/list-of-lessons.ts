import { Component, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { LESSON, LESSON_PDF } from '../../../models/course.model';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { DecimalPipe } from '@angular/common';
import { Back } from '../../../shared/back/back';
import { DurationPipe } from '../../../pipes/duration-pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
        private router: Router,
        private sanitizer: DomSanitizer
    ) { }

    @ViewChild("videoPlayer") videoPlayer!: ElementRef<HTMLVideoElement>

    courseId?: number;
    isPlaying = true;
    controlsHidden = false;
    private hideTimer: any;

    selectedVideo: string | null = null
    description: string = ""
    description_under_video: string = ""

    title: string = ""
    order: string = ""
    videoDuration: number | null = null;
    pdfs: LESSON_PDF[] = [];
    lastSavedSecond = 0;

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
        this.description = lesson.description
        this.description_under_video = lesson.description_under_video

        this.videoDuration = lesson.duration
        this.pdfs = lesson.pdfs
    }

    loadLesson(lesson: LESSON) {
        this.selectLesson(lesson);
    }

    playVideo() {
        this.videoPlayer.nativeElement.play();
        this.isPlaying = false
    }

    pauseVideo() {
        this.videoPlayer.nativeElement.pause();
        this.isPlaying = true
    }

    // Controle native element
    onVideoPlay() {
        this.isPlaying = false;
    }

    // Controle native element
    onVideoPause() {
        const watchedSeconds = Math.floor(this.videoPlayer.nativeElement.currentTime);
        this.sendProgress(watchedSeconds)
        this.isPlaying = true;
    }

    showControls() {
        this.controlsHidden = false;

        clearTimeout(this.hideTimer);

        this.hideTimer = setTimeout(() => {
            this.controlsHidden = true;
        }, 2500);
    }

    hideControls() {
        this.controlsHidden = true;
    }

    onVideoEnded() {
        const duration = Math.floor(this.videoPlayer.nativeElement.duration);
        this.sendProgress(duration);
    }

    onTimeUpdate() {
        const currentSecond = Math.floor(
            this.videoPlayer.nativeElement.currentTime
        );

        // Save every 15 seconds
        if (currentSecond - this.lastSavedSecond >= 15) {
            this.lastSavedSecond = currentSecond;
            console.log(this.lastSavedSecond);
            
            this.sendProgress(currentSecond);
        }
    }

    sendProgress(watchedSeconds: number) {
        const lessonId = Number(this.route.snapshot.paramMap.get('lessonId'));
        const payload = {
            lesson: lessonId,
            watched_seconds: watchedSeconds
        };
        this.courseService.sendProgress(payload).subscribe({
            error: console.error
        });
    }
}
