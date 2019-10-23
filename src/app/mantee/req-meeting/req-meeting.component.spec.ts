import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqMeetingComponent } from './req-meeting.component';

describe('ReqMeetingComponent', () => {
  let component: ReqMeetingComponent;
  let fixture: ComponentFixture<ReqMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
