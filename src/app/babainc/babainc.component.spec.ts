import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabaincComponent } from './babainc.component';

describe('BabaincComponent', () => {
  let component: BabaincComponent;
  let fixture: ComponentFixture<BabaincComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabaincComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabaincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
