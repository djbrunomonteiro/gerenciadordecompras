import { TestBed } from '@angular/core/testing';

import { VendasEffectsService } from './vendas-effects.service';

describe('VendasEffectsService', () => {
  let service: VendasEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendasEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
