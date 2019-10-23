import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabaValuatorComponent } from './baba-valuator.component';

describe('BabaValuatorComponent', () => {
  let component: BabaValuatorComponent;
  let fixture: ComponentFixture<BabaValuatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabaValuatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabaValuatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
