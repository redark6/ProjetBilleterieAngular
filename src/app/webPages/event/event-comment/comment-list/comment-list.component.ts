import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventComment} from '../../../../modeles/eventComment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnChanges {
  @Input() comments: EventComment[];
  @Input() isAuthenticate: boolean;
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
}
