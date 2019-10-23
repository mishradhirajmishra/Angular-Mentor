import { TestBed, async, inject } from '@angular/core/testing';

import { MantorAuthGuard } from './mantor-auth.guard';

describe('MantorAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantorAuthGuard]
    });
  });

  it('should ...', inject([MantorAuthGuard], (guard: MantorAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
