import { Component, inject, signal } from '@angular/core';
import { LESSON, LESSON_PDF } from '../../../../models/course.model';
import { MainStateService } from '../../../../main-services/main-state-service';
import { CourseService } from '../../../../main-services/course-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';
import { finalize, Subscription } from 'rxjs';

@Component({
    selector: 'app-upload-pdf',
    imports: [CommonModule],
    templateUrl: './upload-pdf.html',
    styleUrl: './upload-pdf.scss',
})
export class UploadPdf {
    private baseUrl = environment.apiBaseUrl;
    mainStateService = inject(MainStateService);
    courseService = inject(CourseService)

    lesson = signal<LESSON | null>(null)

    uploadProgress: number = 0;
    uploadSub: Subscription | null = null;

    constructor(private route: ActivatedRoute,
        private router: Router, private http: HttpClient) {
        this.renderLesson();
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.uploadPdf(file);
        }
    }

    uploadPdf(file: File) {
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));

        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('lesson', lessonId.toString());
        formData.append('title', file.name);

        const upload$ = this.courseService.postSinglePdf(formData).pipe(
            finalize(() => {
                setTimeout(() => this.reset(), 1000);
            })
        );

        this.uploadSub = upload$.subscribe(event => {
            if (event.type == HttpEventType.UploadProgress && event.total) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            }
            if (event.type === HttpEventType.Response) {
                this.renderLesson();
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

    // Delete of PDF
    deletePdf(pdfId: number) {
        this.courseService.deleteSinglePdf(pdfId).subscribe({
            next: () => {
                this.mainStateService.displayToast('Pdf wurde erfolgreich gelöscht.', true);
                this.renderLesson();
            },
            error: () => {
                this.mainStateService.displayToast('Du hast kein Internet', false);
            }
        })
    }

    addVideo() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));
        this.router.navigate(["/crm/kurse", courseId, "add-new-lesson", lessonId, "upload-video"]);
    }

}
