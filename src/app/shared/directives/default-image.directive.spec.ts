import { ElementRef } from '@angular/core';
import { DefaultImageDirective } from './default-image.directive';

describe('DefaultImageDirective', () => {
  let img: HTMLElement;
  it('should create an instance', () => {
    const directive = new DefaultImageDirective(new ElementRef(img));
    expect(directive).toBeTruthy();
  });
});
