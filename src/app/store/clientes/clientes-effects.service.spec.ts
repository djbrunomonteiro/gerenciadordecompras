import { TestBed } from '@angular/core/testing';

import { ClientesEffectsService } from './clientes-effects.service';

describe('ClientesEffectsService', () => {
  let service: ClientesEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
