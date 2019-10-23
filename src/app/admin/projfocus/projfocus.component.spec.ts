import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjfocusComponent } from './projfocus.component';

describe('ProjfocusComponent', () => {
  let component: ProjfocusComponent;
  let fixture: ComponentFixture<ProjfocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjfocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjfocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
