import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoolowerComponent } from './foolower.component';

describe('FoolowerComponent', () => {
  let component: FoolowerComponent;
  let fixture: ComponentFixture<FoolowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoolowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoolowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
