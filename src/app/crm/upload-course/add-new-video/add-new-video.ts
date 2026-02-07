import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Back } from '../../../shared/back/back';

@Component({
  selector: 'app-add-new-video',
  imports: [RouterLink, Back],
  templateUrl: './add-new-video.html',
  styleUrl: './add-new-video.scss',
})
export class AddNewVideo {

}
