import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersListComponent } from './sellers-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SellersListComponent', () => {
  let component: SellersListComponent;
  let fixture: ComponentFixture<SellersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellersListComponent, RouterTestingModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SellersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
