import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabastartinComponent } from './babastartin.component';

describe('BabastartinComponent', () => {
  let component: BabastartinComponent;
  let fixture: ComponentFixture<BabastartinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabastartinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabastartinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
