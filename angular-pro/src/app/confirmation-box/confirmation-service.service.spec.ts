import { TestBed, inject } from '@angular/core/testing';

import { CofirmationServiceService } from './confirmation-service.service';

describe('CofirmationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CofirmationServiceService]
    });
  });

  it('should be created', inject([CofirmationServiceService], (service: CofirmationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
