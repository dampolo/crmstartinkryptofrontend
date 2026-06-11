import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Back } from '../../../shared/back/back';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainStateService } from '../../../main-services/main-state-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../main-services/course-service';
import { COURSE_FEATURE } from '../../../models/course.model';
import { ToastService } from '../../../main-services/toast-service';

@Component({
    selector: 'app-edit-course',
    imports: [CommonModule, Back, ReactiveFormsModule, FormsModule, RouterLink],

    templateUrl: './edit-course.html',
    styleUrl: './edit-course.scss',
})
export class EditCourse {

    showEdit = true;
    showDescription = true;
    showPrice = true;
    showStatus = true


    statusForm: FormGroup;
    mainDataForm: FormGroup;

    shortDescriptionForm: FormGroup
    features: COURSE_FEATURE[] = []
    priceForm: FormGroup

    courseService = inject(CourseService)
    toastService = inject(ToastService);

    constructor(private route: ActivatedRoute, private router: Router) {

        // Status
        this.statusForm = new FormGroup({
            status: new FormControl("draft")
        })

        this.mainDataForm = new FormGroup({
            name: new FormControl(''),
            order: new FormControl(0),
            badge: new FormControl("")

        });

        this.shortDescriptionForm = new FormGroup({
            description: new FormControl("dddd")
        })

        this.priceForm = new FormGroup({
            price: new FormControl('')
        });
    }

    ngOnInit() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));

        this.courseService.getCourse(courseId).subscribe({
            next: (data) => {
                this.toastService.displayToast('Die Daten wurden gelesen', true)

                this.mainDataForm.patchValue({
                    name: data.name,
                    order: data.order,
                    badge: data.badge
                });

                this.shortDescriptionForm.patchValue({
                    description: data.description
                });

                this.priceForm.patchValue({
                    price: data.price
                });

                //    this.features = data.features;


            },
            error: (err) => {
                this.toastService.displayToast('Du hast kein Internet', false)
            }
        })
    }

    editDescription() {
        this.showDescription = !this.showDescription
    }

    submitDescription() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));
        const payload = {
            description: this.shortDescriptionForm.value.description,
        }

        this.courseService.updateCourse(courseId, payload).subscribe({
            next: (data) => {
                this.showDescription = !this.showDescription
                this.toastService.displayToast('Die Beschreibung wurden erfolgreich gespeichert.', true)
            },
            error: (err) => {
                this.toastService.displayToast('Du hast kein Internet', false)
            }
        })

    }

    editPrice() {
        this.showPrice = !this.showPrice
    }

    submitPrice() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));
        const payload = {
            price: this.priceForm.value.price,
        }
        this.courseService.updateCourse(courseId, payload).subscribe({
            next: (data) => {
                this.showPrice = !this.showPrice;
                this.toastService.displayToast('Der Prise wurden erfolgreich gespeichert.', true)
            },
            error: (err) => {
                this.toastService.displayToast('Du hast kein Internet', false)
            }
        })
    }

    editStatus() {
        this.showStatus = !this.showStatus;
    }

    submitStatus() {
        this.showStatus = !this.showStatus;
        this.toastService.displayToast('Daten wurden erfolgreich gespeichert.', true)
    }

    editMainData() {
        this.showEdit = !this.showEdit;
    }

    sumbitMainData() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));
        const payload = {
            name: this.mainDataForm.value.name,
            order: this.mainDataForm.value.order,
            badge: this.mainDataForm.value.badge
        }

        this.courseService.updateCourse(courseId, payload).subscribe({
            next: (data) => {
                this.showEdit = !this.showEdit;
                this.toastService.displayToast('Daten wurden erfolgreich gespeichert.', true)
            },
            error: (err) => {
                this.toastService.displayToast('Du hast kein Internet', false)
            }
        })
    }

    openFeatures() {
        const courseId = Number(this.route.snapshot.paramMap.get("courseId"));

        this.router.navigate(['/crm/kurse', courseId, 'edit-features'])
    }
}
