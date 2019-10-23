import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferencComponent } from './conferenc.component';

describe('ConferencComponent', () => {
  let component: ConferencComponent;
  let fixture: ComponentFixture<ConferencComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferencComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferencComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
