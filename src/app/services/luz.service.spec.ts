import { TestBed, inject } from '@angular/core/testing';

import { LuzService } from './luz.service';

describe('LuzService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LuzService]
    });
  });

  it('should be created', inject([LuzService], (service: LuzService) => {
    expect(service).toBeTruthy();
  }));
});
