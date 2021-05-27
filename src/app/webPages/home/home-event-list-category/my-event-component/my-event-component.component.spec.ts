import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventComponentComponent } from './my-event-component.component';

describe('MyEventComponentComponent', () => {
  let component: MyEventComponentComponent;
  let fixture: ComponentFixture<MyEventComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEventComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
