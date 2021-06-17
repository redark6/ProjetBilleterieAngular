import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserCardComponent } from './organiser-card.component';

describe('OrganiserCardComponent', () => {
  let component: OrganiserCardComponent;
  let fixture: ComponentFixture<OrganiserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganiserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganiserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
