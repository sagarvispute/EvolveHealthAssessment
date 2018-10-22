import { TestBed, inject } from '@angular/core/testing';

import { AppServiceService } from './app-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppServiceService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([AppServiceService], (service: AppServiceService) => {
    expect(service).toBeTruthy();
  }));
});
