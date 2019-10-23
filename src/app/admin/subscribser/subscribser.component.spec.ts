import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribserComponent } from './subscribser.component';

describe('SubscribserComponent', () => {
  let component: SubscribserComponent;
  let fixture: ComponentFixture<SubscribserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
