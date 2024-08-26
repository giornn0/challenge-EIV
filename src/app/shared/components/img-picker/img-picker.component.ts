import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DefaultImageDirective } from 'app/shared/directives';
import { handleFileEvent } from 'app/shared/functions';
import { FileExtension } from 'app/shared/models';

@Component({
  selector: 'app-img-picker',
  standalone: true,
  imports: [ReactiveFormsModule, DefaultImageDirective, NgClass],
  templateUrl: './img-picker.component.html',
  styleUrl: './img-picker.component.scss',
})
export class ImgPickerComponent {
  @Input() imgSrc?: string;
  @Input() defaultImg?: string;
  @Input() control?: FormControl<any>;
  @Input() accept = [
    FileExtension.Webp,
    FileExtension.Png,
    FileExtension.Jpg,
    FileExtension.Jpeg,
  ];
  @Output() change = new EventEmitter<File>();

  setImg(event: Event) {
    event.stopPropagation();
    const file = handleFileEvent(event);
    if (file) {
      this.change.emit(file);
      this.clearOldImg();

      this.imgSrc = URL.createObjectURL(file);
    }
  }
  clearOldImg() {
    if (this.imgSrc) {
      URL.revokeObjectURL(this.imgSrc);
    }
  }
}
