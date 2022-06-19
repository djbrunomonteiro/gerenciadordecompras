import { TestBed } from '@angular/core/testing';

import { ComprasEffectsService } from './compras-effects.service';

describe('ComprasEffectsService', () => {
  let service: ComprasEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprasEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
