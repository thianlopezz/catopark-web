import { TestBed, inject } from '@angular/core/testing';

import { TelefonoService } from './telefono.service';

describe('TelefonoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TelefonoService]
    });
  });

  it('should be created', inject([TelefonoService], (service: TelefonoService) => {
    expect(service).toBeTruthy();
  }));
});
