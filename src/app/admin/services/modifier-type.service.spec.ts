import { TestBed } from '@angular/core/testing';

import { ModifierTypeService } from './modifier-type.service';

describe('ModifierTypeService', () => {
  let service: ModifierTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifierTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
