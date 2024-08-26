import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPickerComponent } from './img-picker.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-tester-img-picker',
  imports: [ImgPickerComponent],
  template:
    '<app-img-picker [control]="control" imgSrc="empty" ></app-img-picker>',
})
class WrapperImgPicker {
  contro = new FormControl();
}

describe('ImgPickerComponent', () => {
  let component: ImgPickerComponent;
  let fixture: ComponentFixture<WrapperImgPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgPickerComponent, WrapperImgPicker],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperImgPicker);
    component = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
