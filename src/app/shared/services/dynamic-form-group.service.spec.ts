import { TestBed } from '@angular/core/testing';

import { DynamicFormGroupService } from './dynamic-form-group.service';

describe('DynamicFormGroupService', () => {
  let service: DynamicFormGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
