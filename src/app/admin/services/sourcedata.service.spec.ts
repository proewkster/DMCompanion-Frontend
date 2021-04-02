import { TestBed } from '@angular/core/testing';

import { SourcedataService } from './sourcedata.service';

describe('SourcedataService', () => {
  let service: SourcedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourcedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
