import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubHelpareaComponent } from './admin-sub-helparea.component';

describe('AdminSubHelpareaComponent', () => {
  let component: AdminSubHelpareaComponent;
  let fixture: ComponentFixture<AdminSubHelpareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubHelpareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubHelpareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
