import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Back } from '../../../../shared/back/back';
import { ActivatedRoute, Router } from '@angular/router';
import { MainStateService } from '../../../../main-services/main-state-service';
import { CourseService } from '../../../../main-services/course-service';
import { LESSON } from '../../../../models/course.model';
import { finalize, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
    selector: 'app-upload-video',
    imports: [CommonModule, Back],
    templateUrl: './upload-video.html',
    styleUrl: './upload-video.scss',
})
export class UploadVideo {

    mainStateService = inject(MainStateService);
    courseService = inject(CourseService)

    lesson = signal<LESSON | null>(null)

    uploadProgress: number = 0;
    uploadSub: Subscription | null = null;
    isDragging = false;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.renderLesson();
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.isDragging = false;

        if (event.dataTransfer?.files.length) {
            const file = event.dataTransfer.files[0];
            this.uploadVideo(file);
        }
    }


    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.uploadVideo(file);
        }
    }


    uploadVideo(file: File) {
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));

        if (!file) return;

        const formData = new FormData();
        formData.append("video", file);

        const upload$ = this.courseService.pathVideo(lessonId, formData).pipe(
            finalize(() => {
                setTimeout(() => this.reset(), 1000);
            })
        );

        this.uploadSub = upload$.subscribe(event => {
            if (event.type == HttpEventType.UploadProgress && event.total) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            }
            if (event.type === HttpEventType.Response) {
                this.renderLesson()
            }
        })
    }

    cancelUpload() {
        this.uploadSub?.unsubscribe();
        this.reset();
    }
    reset() {
        this.uploadProgress = 0;
        this.uploadSub = null;
    }


    backToPdf() {
        this.addPdf();
    }

    addPdf() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));
        this.router.navigate(["/crm/kurse", courseId, "add-new-lesson", lessonId, "upload-pdf"]);
    }

    renderLesson() {
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));
        this.courseService.getSingleLessonsCrm(lessonId).subscribe({
            next: (data) => {
                this.lesson.set(data)
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })
    }

    deleteVideo() {
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));
        const payload = {
            video: null
        }

        this.courseService.pathVideo(lessonId, payload).subscribe({
            next: () => {
                this.mainStateService.displayToast("Das Video wurde erfolgreich gelöscht", true);
                this.renderLesson();
            },
            error: () => {
                this.mainStateService.displayToast("Versuche es noch einmal.", true);

            }
        })

    }
    
}
