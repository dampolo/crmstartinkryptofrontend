import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Back } from '../../../shared/back/back';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-video',
  imports: [RouterLink, Back, ReactiveFormsModule, CommonModule],
  templateUrl: './add-new-video.html',
  styleUrl: './add-new-video.scss',
})
export class AddNewVideo {

  showEdit = false

  editTitle() {
    this.showEdit = !this.showEdit;
  }

  saveTitle() {
    this.showEdit = !this.showEdit;
  }


}
