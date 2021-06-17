import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserPageComponent } from './organiser-page.component';

describe('OrganiserPageComponent', () => {
  let component: OrganiserPageComponent;
  let fixture: ComponentFixture<OrganiserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganiserPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganiserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
