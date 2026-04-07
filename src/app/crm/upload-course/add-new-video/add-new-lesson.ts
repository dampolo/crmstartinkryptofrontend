import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainStateService } from '../../../main-services/main-state-service';
import { CourseService } from '../../../main-services/course-service';
import { Back } from '../../../shared/back/back';
import { LESSON_PDF } from '../../../models/course.model';

@Component({
    selector: 'app-add-new-lesson',
    imports: [ReactiveFormsModule, CommonModule, Back],
    templateUrl: './add-new-lesson.html',
    styleUrl: './add-new-lesson.scss',
})
export class AddNewLesson {
    lessonForm: FormGroup;

    mainStateService = inject(MainStateService);
    courseService = inject(CourseService)

    showEdit = false

    pdfs = signal<LESSON_PDF[]>([])

    constructor(private route: ActivatedRoute, private router: Router) {
        this.lessonForm = new FormGroup({
            title: new FormControl("", Validators.required),
            description: new FormControl("", Validators.required),
            order: new FormControl(0, Validators.required),
            status: new FormControl("draft", Validators.required),
            description_under_video: new FormControl("", Validators.required)
        });
    }

    sumbitMainData() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))

        const payload = {
            course: courseId,
            title: this.lessonForm.value.title,
            description: this.lessonForm.value.description,
            order: this.lessonForm.value.order,
            status: this.lessonForm.value.status,
            description_under_video: this.lessonForm.value.description_under_video,
            pdfs: this.pdfs
        }

        this.courseService.postLesson(courseId, payload).subscribe({
            next: () => {
                this.mainStateService.displayToast('Die Lektion wurde gespeichert', true)

            },
            error: () => {
                this.mainStateService.displayToast('Versuche es noch einmal.', false)
            }
        })

    }


    editTitle() {
        this.showEdit = !this.showEdit;
    }

    saveTitle() {
        this.showEdit = !this.showEdit;
    }

    backToListOfLessons() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"))

        this.router.navigate(["/crm/kurse", courseId, "list-of-lessons"])
    }

    deletePdf(pdfId: number) {
    }

    formatFileSize(size: number): string {
        if (size < 1024) return size + ' B';
        if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
        return (size / (1024 * 1024)).toFixed(1) + ' MB';
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];

        if (file) {
            const newPdf: LESSON_PDF = {
                id: Date.now(),
                lesson: Date.now(),
                title: file.name,
                file: file,
                file_size_display: this.formatFileSize(file.size),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };

            this.pdfs.update(pdfs => [...pdfs, newPdf]);
            console.log(this.pdfs());
            
        }
    }

}
