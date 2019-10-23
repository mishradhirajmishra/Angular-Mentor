import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrestAreaComponent } from './intrest-area.component';

describe('IntrestAreaComponent', () => {
  let component: IntrestAreaComponent;
  let fixture: ComponentFixture<IntrestAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrestAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrestAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
