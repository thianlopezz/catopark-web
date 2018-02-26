import { TestBed, inject } from '@angular/core/testing';

import { VehiOcupanteService } from './vehi-ocupante.service';

describe('VehiOcupanteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiOcupanteService]
    });
  });

  it('should be created', inject([VehiOcupanteService], (service: VehiOcupanteService) => {
    expect(service).toBeTruthy();
  }));
});
