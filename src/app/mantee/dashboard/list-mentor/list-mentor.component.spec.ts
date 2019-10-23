import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMentorComponent } from './list-mentor.component';

describe('ListMentorComponent', () => {
  let component: ListMentorComponent;
  let fixture: ComponentFixture<ListMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
