import { TestBed } from '@angular/core/testing';

import { ManteeService } from './mantee.service';

describe('ManteeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManteeService = TestBed.get(ManteeService);
    expect(service).toBeTruthy();
  });
});
