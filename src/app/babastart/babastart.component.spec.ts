import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabastartComponent } from './babastart.component';

describe('BabastartComponent', () => {
  let component: BabastartComponent;
  let fixture: ComponentFixture<BabastartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabastartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabastartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
