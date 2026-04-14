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

    constructor(private route: ActivatedRoute, private router: Router) { }

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
}
