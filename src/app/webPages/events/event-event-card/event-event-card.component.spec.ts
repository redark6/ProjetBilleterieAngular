import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEventCardComponent } from './event-event-card.component';

describe('EventEventCardComponent', () => {
  let component: EventEventCardComponent;
  let fixture: ComponentFixture<EventEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
