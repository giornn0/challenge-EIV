import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersFormComponent } from './sellers-form.component';

describe('SellersFormComponent', () => {
  let component: SellersFormComponent;
  let fixture: ComponentFixture<SellersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellersFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
