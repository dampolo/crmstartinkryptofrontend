import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../../main-services/course-service';
import { MainStateService } from '../../../main-services/main-state-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Back } from '../../../shared/back/back';
import { LESSON } from '../../../models/course.model';

@Component({
    selector: 'app-edit-lesson',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, Back],
    templateUrl: './edit-lesson.html',
    styleUrl: './edit-lesson.scss',
})
export class EditLesson {

    showEdit = true;
    showLongDescription = true;
    showDescription = true;

    showPrice = true;
    showStatus = true


    statusForm: FormGroup;
    mainDataForm: FormGroup;

    descriptionForm: FormGroup
    longDescriptionForm: FormGroup

    lesson = signal<LESSON | null>(null)

    mainStateService = inject(MainStateService);
    courseService = inject(CourseService)

    constructor(private route: ActivatedRoute, private router: Router) {
        this.mainDataForm = new FormGroup({
            title: new FormControl(''),
            order: new FormControl(0),
        });

        // Status
        this.statusForm = new FormGroup({
            status: new FormControl("draft")
        })


        this.descriptionForm = new FormGroup({
            description: new FormControl("short")
        })

        this.longDescriptionForm = new FormGroup({
            long_description: new FormControl("long")
        })
    }

    ngOnInit(): void {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));

        this.courseService.getSingleLessonsCrm(lessonId).subscribe({
            next: (data) => {
                this.lesson.set(data)
                console.log(data);

                this.mainDataForm.patchValue({
                    title: data.title,
                    order: data.order
                });

                this.statusForm.patchValue({
                    status: data.status
                });

                this.descriptionForm.patchValue({
                    description: data.description
                });

                this.longDescriptionForm.patchValue({
                    long_description: data.description_under_video
                });

            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })

    }



    editMainData() {
        this.showEdit = !this.showEdit
    }

    sumbitMainData() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));

        const payload = {
            title: this.mainDataForm.value.title,
            order: this.mainDataForm.value.order,
            course: courseId
        }
        this.courseService.patchSingleLessons(lessonId, payload).subscribe({
            next: (data) => {
                this.showEdit = !this.showEdit;
                this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true)
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })
    }

    editStatus() { }

    submitStatus() { }

    submitDescription() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));

        const payload = {
            description: this.descriptionForm.value.description,
            course: courseId
        }

        this.courseService.patchSingleLessons(lessonId, payload).subscribe({
            next: (data) => {
                this.showDescription = !this.showDescription
                this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true)
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false)
            }
        })
    }

    editDescription() {
        this.showDescription = !this.showDescription
    }

    submitLongDescription() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));
        const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));

        const payload = {
            description_under_video: this.descriptionForm.value.long_description,
            course: courseId
        }

        this.courseService.patchSingleLessons(lessonId, payload).subscribe({
            next: (data) => {
                this.showLongDescription = !this.showLongDescription;
                this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true);
            },
            error: (err) => {
                this.mainStateService.displayToast('Du hast kein Internet', false);
            }
        })

    }

    editLongDescription() {
        this.showLongDescription = this.showLongDescription
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
                    console.log('Uploaded:', res),
                        this.mainStateService.displayToast('Daten wurden erfolgreich gespeichert.', true);
                },

                error: (err) => {
                    console.error(err)
                    this.mainStateService.displayToast('Du hast kein Internet', false);

                }
            });
    }

}
