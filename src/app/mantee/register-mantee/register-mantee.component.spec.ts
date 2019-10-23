import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterManteeComponent } from './register-mantee.component';

describe('RegisterManteeComponent', () => {
  let component: RegisterManteeComponent;
  let fixture: ComponentFixture<RegisterManteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterManteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterManteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
