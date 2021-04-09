import { Component, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  likes = 100;
  dislikes = 100;
  time = formatDistance(new Date(), new Date());

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
