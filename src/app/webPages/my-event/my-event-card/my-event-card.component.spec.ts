import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventCardComponent } from './my-event-card.component';

describe('MyEventCardComponent', () => {
  let component: MyEventCardComponent;
  let fixture: ComponentFixture<MyEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
