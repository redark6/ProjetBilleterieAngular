import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisersComponent } from './organisers.component';

describe('OrganisersComponent', () => {
  let component: OrganisersComponent;
  let fixture: ComponentFixture<OrganisersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
