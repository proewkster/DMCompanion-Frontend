import { TestBed } from '@angular/core/testing';

import { AbilityscoreService } from './abilityscore.service';

describe('AbilityscoreService', () => {
  let service: AbilityscoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbilityscoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
