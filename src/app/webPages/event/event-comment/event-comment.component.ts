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
  authSubscription: Subscription;
  searchResultSubscription: Subscription;
  constructor(private commentService: CommentService, private  user: UserService, private router: Router) { }

  ngOnInit(): void {
    console.log('start');
    this.commentService.get(this.eventId);

    this.authSubscription = this.user.authListener().subscribe(state => {
      this.isAuthenticate = state;
    });

    this.searchResultSubscription = this.commentService.searchCommentListener().subscribe(state => {
      this.comments = state;
      console.log('ici');
    });
  }
}
