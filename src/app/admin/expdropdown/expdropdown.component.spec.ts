import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpdropdownComponent } from './expdropdown.component';

describe('ExpdropdownComponent', () => {
  let component: ExpdropdownComponent;
  let fixture: ComponentFixture<ExpdropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
