import { Component, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
@Component({
  selector: 'app-comment-writer',
  templateUrl: './comment-writer.component.html',
  styleUrls: ['./comment-writer.component.css']
})
export class CommentWriterComponent implements OnInit {
  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date())
        }
      ].map(e => {
        return {
          ...e,
          displayTime: formatDistance(new Date(), e.datetime)
        };
      });
    }, 800);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
