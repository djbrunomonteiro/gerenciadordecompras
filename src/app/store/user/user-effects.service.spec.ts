import { TestBed } from '@angular/core/testing';

import { UserEffectsService } from './user-effects.service';

describe('UserEffectsService', () => {
  let service: UserEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
