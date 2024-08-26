import { TestBed } from '@angular/core/testing';

import { LocationsApiService } from './locations-api.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('LocationsApiService', () => {
  let service: LocationsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LocationsApiService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
