import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { formatDistance } from 'date-fns';
import {EventComment} from '../../../../modeles/eventComment';
import {UserService} from '../../../../services/user.service';
import {CommentService} from '../../../../services/comment.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: EventComment;
  @Input() isAuthenticate: boolean;
  @Input() eventId: number;
  @Output() childresponse: EventEmitter<void> = new EventEmitter<void>();
  @Input() childnumber: number;


  likes: number;
  dislikes: number;
  time: string;
  likeState: number;
  commentContent: string;
  anwserId: string;

  likevisible: false;
  dislikevisible: false;

  user = {
    author: '',
    avatar: ''
  };

  constructor(private  userService: UserService, private commentService: CommentService) { }

  ngOnInit(): void {

    this.likes = this.comment.numberOfLike;
    this.dislikes =  this.comment.numberOfDislike;
    this.likeState = this.comment.isLikeOrDislikeByUser;

    this.time =  formatDistance(new Date(),  new Date(this.comment.creationDateHours));

    this.user.author = this.comment.userName;
    this.user.avatar = this.comment.avatar;
    this.commentContent = this.comment.comment;

    this.anwserId = 'anwser' + this.comment.id;
  }

  like(): void {
    if (this.isAuthenticate){
      this.commentService.likecomment(this.comment.id, 1).subscribe(value => {
          switch (this.likeState) {
            case 1:
              this.likes -= 1;
              this.likeState = 0;
              break;
            case 0:
              this.likes += 1;
              this.likeState = 1;
              break;
            case -1:
              this.likes += 1;
              this.dislikes -= 1;
              this.likeState = 1;
              break;
          }
      },
        error => {
        }
        );
    }
  }

  dislike(): void {
    if (this.isAuthenticate) {
      this.commentService.likecomment(this.comment.id, -1).subscribe(value => {
        switch (this.likeState) {
          case 1:
            this.likes -= 1;
            this.dislikes += 1;
            this.likeState = -1;
            break;
          case 0:
            this.dislikes += 1;
            this.likeState = -1;
            break;
          case -1:
            this.dislikes -= 1;
            this.likeState = 0;
            break;
        }
      }, error => {

      });



    }
  }


  clickMe(): void {
    this.likevisible = false;
    this.dislikevisible = false;
  }

  onchildresponse(): void {
    this.childresponse.emit();
  }
}
