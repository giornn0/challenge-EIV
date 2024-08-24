import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SpinnerService } from '@shared';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  $spinning = inject(SpinnerService).$spinner;
}
