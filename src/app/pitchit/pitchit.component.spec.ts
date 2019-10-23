import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchitComponent } from './pitchit.component';

describe('PitchitComponent', () => {
  let component: PitchitComponent;
  let fixture: ComponentFixture<PitchitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
