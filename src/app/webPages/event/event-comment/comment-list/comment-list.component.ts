import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventComment} from '../../../../modeles/eventComment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnChanges {
  @Input() comments: EventComment[];
  @Input() isAuthenticate: boolean;
  @Input() authority: string;
  @Input() eventId: number;
  @Output()childresponse: EventEmitter<void> = new EventEmitter<void>();
  commentList: EventComment[];

  ngOnInit(): void {
    this.commentList = this.comments;
  }


  ngOnChanges(changes: SimpleChanges): void {
    // only run when property "data" changed
    if (changes.comments) {
      console.log(changes.comments.currentValue);
      this.commentList = changes.comments.currentValue;
      console.log(this.commentList);
    }
  }

  childresponsefunc(): void {
    this.childresponse.emit();
  }
}
