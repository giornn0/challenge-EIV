import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { appBaseUrl } from '@shared';

const defaultImage = 'icons/circle-dot-dashed.svg';

@Directive({
  selector: '[appDefaultImage]',
  standalone: true,
})
export class DefaultImageDirective {
  @Input() defaultImage?: string = defaultImage;
  private isApplied: boolean = false;

  constructor(private el: ElementRef) {}

  get imgSrc() {
    return this.nodeEl.src;
  }
  get nodeEl() {
    return <HTMLImageElement>this.el.nativeElement;
  }

  @HostListener('error')
  onError() {
    if (!this.isApplied) {
      this.isApplied = true;
      this.nodeEl.classList.add('svg-text');
      this.nodeEl.src = this.defaultImage ? this.defaultImage : defaultImage;
    }
  }

  @HostListener('load')
  onLoad() {
    if (
      this.isApplied &&
      this.imgSrc.replace(appBaseUrl, '') !== this.defaultImage
    ) {
      this.nodeEl.classList.remove('svg-text');
    }
  }
}
