import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
type MockTest = {
  id: number;
  name: string;
};
describe('ApiService', () => {
  let service: ApiService<MockTest>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    TestBed.runInInjectionContext(() => {
      service = new ApiService('mocking');
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
