import { TestBed } from '@angular/core/testing';

import { SellersApiService } from './sellers-api.service';

describe('SellersApiService', () => {
  let service: SellersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
