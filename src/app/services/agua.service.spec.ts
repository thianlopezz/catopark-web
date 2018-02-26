import { TestBed, inject } from '@angular/core/testing';

import { AguaService } from './agua.service';

describe('AguaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AguaService]
    });
  });

  it('should be created', inject([AguaService], (service: AguaService) => {
    expect(service).toBeTruthy();
  }));
});
