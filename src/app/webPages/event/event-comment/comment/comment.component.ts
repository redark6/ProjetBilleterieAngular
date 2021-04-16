import {Component, Input, OnInit} from '@angular/core';
import { formatDistance } from 'date-fns';
import {EventComment} from '../../../../modeles/eventComment';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: EventComment;
  @Input() isAuthenticate: boolean;
  likes: number;
  dislikes: number;
  time: string;
  likeState: number;
  commentContent: string;

  user = {
    author: '',
    avatar: ''
  };

  like(): void {
    if (this.isAuthenticate){
      this.likes = 1;
      this.dislikes = 0;
    }
  }

  dislike(): void {
    if (this.isAuthenticate) {
      this.likes = 0;
      this.dislikes = 1;
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.likes = this.comment.numberOfLike;
    this.dislikes =  this.comment.numberOfDislike;
    this.likeState = this.comment.isLikeOrDislikeByUser;

    this.time =  formatDistance(new Date(), new Date());
    this.user.author = this.comment.userName;
    this.user.avatar = this.comment.avatar;
    this.commentContent = this.comment.comment;
    console.log(this.comment.creationDateHours);
  }

  likevisible: boolean = false;
  dislikevisible: boolean = false;
  clickMe(): void {
    this.likevisible = false;
    this.dislikevisible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

}
