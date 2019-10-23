import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchitDatailComponent } from './pitchit-datail.component';

describe('PitchitDatailComponent', () => {
  let component: PitchitDatailComponent;
  let fixture: ComponentFixture<PitchitDatailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchitDatailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchitDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
