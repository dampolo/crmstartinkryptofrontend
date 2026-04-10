import { Component, inject, signal } from '@angular/core';
import { LESSON_PDF } from '../../../../models/course.model';
import { MainStateService } from '../../../../main-services/main-state-service';
import { CourseService } from '../../../../main-services/course-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-upload-pdf',
    imports: [CommonModule],
    templateUrl: './upload-pdf.html',
    styleUrl: './upload-pdf.scss',
})
export class UploadPdf {

    mainStateService = inject(MainStateService);
    courseService = inject(CourseService)

    pdfs = signal<LESSON_PDF[]>([])

    constructor(private route: ActivatedRoute, private router: Router) {

    }
    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.uploadPdf(file)
        }
    }

    uploadPdf(file: File) {

        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));

        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('lesson', lessonId.toString());
        formData.append('title', file.name);

        this.courseService.postSinglePdf(formData)
            .subscribe({
                next: (res) => {
                    this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true);
                    this.renderPdfs()
                },
                error: (err) => {
                    this.mainStateService.displayToast('Du hast kein Internet', false);
                }
            });
    }

    renderPdfs() {
        debugger
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));
        this.courseService.getSinglePdf(lessonId).subscribe({
            next: (data) => {
                this.pdfs.set(data)
            },
            error: (err) => {
                console.log(err);
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })
    }

    deletePdf(pdfId: number) {
        this.courseService.deleteSinglePdf(pdfId).subscribe({
            next: () => {
                this.mainStateService.displayToast('Pdf wurde erfolgreich gelöscht.', true);
            },
            error: () => {
                this.mainStateService.displayToast('Du hast kein Internet', false);
            }
        })
    }

}
