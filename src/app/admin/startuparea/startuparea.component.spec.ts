import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupareaComponent } from './startuparea.component';

describe('StartupareaComponent', () => {
  let component: StartupareaComponent;
  let fixture: ComponentFixture<StartupareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
