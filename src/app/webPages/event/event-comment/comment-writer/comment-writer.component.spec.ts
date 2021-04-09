import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentWriterComponent } from './comment-writer.component';

describe('CommentWriterComponent', () => {
  let component: CommentWriterComponent;
  let fixture: ComponentFixture<CommentWriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentWriterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
