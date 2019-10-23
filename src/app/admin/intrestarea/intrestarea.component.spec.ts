import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrestareaComponent } from './intrestarea.component';

describe('IntrestareaComponent', () => {
  let component: IntrestareaComponent;
  let fixture: ComponentFixture<IntrestareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrestareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrestareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
