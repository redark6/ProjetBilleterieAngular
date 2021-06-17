import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListPaginationComponent } from './event-list-pagination.component';

describe('EventListPaginationComponent', () => {
  let component: EventListPaginationComponent;
  let fixture: ComponentFixture<EventListPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
