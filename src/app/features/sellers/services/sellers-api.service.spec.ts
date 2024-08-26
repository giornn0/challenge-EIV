import { TestBed } from '@angular/core/testing';

import { SellersApiService } from './sellers-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SellersApiService', () => {
  let service: SellersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SellersApiService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
