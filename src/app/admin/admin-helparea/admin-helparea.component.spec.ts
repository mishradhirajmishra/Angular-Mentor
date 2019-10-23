import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHelpareaComponent } from './admin-helparea.component';

describe('AdminHelpareaComponent', () => {
  let component: AdminHelpareaComponent;
  let fixture: ComponentFixture<AdminHelpareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHelpareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHelpareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
