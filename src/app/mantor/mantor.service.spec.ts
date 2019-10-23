import { TestBed } from '@angular/core/testing';

import { MantorService } from './mantor.service';

describe('MantorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MantorService = TestBed.get(MantorService);
    expect(service).toBeTruthy();
  });
});
