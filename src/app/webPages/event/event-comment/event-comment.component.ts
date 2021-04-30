import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {CommentService} from '../../../services/comment.service';
import {EventComment} from '../../../modeles/eventComment';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';

import {Router} from '@angular/router';


@Component({
  selector: 'app-event-comment',
  templateUrl: './event-comment.component.html',
  styleUrls: ['./event-comment.component.css']
})
export class EventCommentComponent implements OnInit {
  @Input() eventId: number;
  comments: EventComment[];
  isAuthenticate: boolean;
  constructor(private commentService: CommentService, private  user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.commentService.get(this.eventId);

    this.user.authListener().subscribe(state => {
      this.isAuthenticate = state;
    });
    this.refreshComment();
  }

  private refreshComment(): void {
    this.commentService.get(this.eventId);
    this.commentService.searchCommentListener().subscribe(state => {
      this.comments = state;
    });
  }

  public onCommentSent(): void {
    this.refreshComment();
  }
}
