import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMantorComponent } from './register-mantor.component';

describe('RegisterMantorComponent', () => {
  let component: RegisterMantorComponent;
  let fixture: ComponentFixture<RegisterMantorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMantorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
