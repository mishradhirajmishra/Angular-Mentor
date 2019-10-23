import { TestBed } from '@angular/core/testing';

import { MainSericeService } from './main-serice.service';

describe('MainSericeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainSericeService = TestBed.get(MainSericeService);
    expect(service).toBeTruthy();
  });
});
