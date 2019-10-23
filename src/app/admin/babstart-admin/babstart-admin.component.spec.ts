import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabstartAdminComponent } from './babstart-admin.component';

describe('BabstartAdminComponent', () => {
  let component: BabstartAdminComponent;
  let fixture: ComponentFixture<BabstartAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabstartAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabstartAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
