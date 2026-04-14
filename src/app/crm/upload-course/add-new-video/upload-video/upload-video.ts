import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Back } from '../../../../shared/back/back';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upload-video',
  imports: [CommonModule, Back],
  templateUrl: './upload-video.html',
  styleUrl: './upload-video.scss',
})
export class UploadVideo {

  constructor(private route: ActivatedRoute, private router: Router) { }

  backToLessons() {
    const courseId = Number(this.route.snapshot.paramMap.get("courseId"))

    this.router.navigate(["/crm/kurse", courseId, "add-new-lesson"])
  }

  addPdf() {
    const courseId = Number(this.route.snapshot.paramMap.get("courseId"));
    const lessonId = Number(this.route.snapshot.paramMap.get("lessonId"));
    this.router.navigate(["/crm/kurse", courseId, "add-new-lesson", lessonId, "upload-pdf"]);
  }
}
