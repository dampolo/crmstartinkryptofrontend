import { Component, inject } from '@angular/core';
import { AlgorithmusControl } from '../../services/algorithmus-control';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-algorithmus',
  imports: [DecimalPipe],
  templateUrl: './algorithmus.html',
  styleUrl: './algorithmus.scss'
})
export class Algorithmus {
  algorithmusControl = inject(AlgorithmusControl)
}
