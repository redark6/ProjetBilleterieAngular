import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEventListCategoryComponent } from './home-event-list-category.component';

describe('HomeEventListCategoryComponent', () => {
  let component: HomeEventListCategoryComponent;
  let fixture: ComponentFixture<HomeEventListCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEventListCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEventListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
