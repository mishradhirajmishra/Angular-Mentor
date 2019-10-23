import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdudropdownComponent } from './edudropdown.component';

describe('EdudropdownComponent', () => {
  let component: EdudropdownComponent;
  let fixture: ComponentFixture<EdudropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdudropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdudropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
