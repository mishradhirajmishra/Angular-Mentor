import { TestBed, async, inject } from '@angular/core/testing';

import { ManteeAuthGuard } from './mantee-auth.guard';

describe('ManteeAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManteeAuthGuard]
    });
  });

  it('should ...', inject([ManteeAuthGuard], (guard: ManteeAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
