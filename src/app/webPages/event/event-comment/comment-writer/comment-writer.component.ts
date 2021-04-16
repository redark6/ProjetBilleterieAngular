import {Component, Input, OnInit} from '@angular/core';
import { formatDistance } from 'date-fns';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../../../../services/comment.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-comment-writer',
  templateUrl: './comment-writer.component.html',
  styleUrls: ['./comment-writer.component.css']
})
export class CommentWriterComponent implements OnInit {
  @Input() parentComment: string;
  @Input() eventId: string;
  @Input() isAuthenticate: boolean;
  commentForm: FormGroup;
  inputValue = '';
  placeholder: string;

  constructor(private formBuilder: FormBuilder, private commentService: CommentService, private router: Router) { }

  ngOnInit(): void {
    if (!this.parentComment){
      this.parentComment = null;
    }
    this.commentForm = this.formBuilder.group({
      parentComment: [this.parentComment],
      eventId: [this.eventId, Validators.compose([
        Validators.required
      ])],
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ])]
    });
    if (this.isAuthenticate != null){
      this.placeholder = 'Votre message en 1 à 500 caractères';
    }
    else {
      this.placeholder = 'Vous devez être connecté pour poster un message';
    }
  }

  handleSubmit(): void {
    console.log(this.isAuthenticate);
    this.commentForm.get('comment').setValue(this.inputValue);
    this.commentForm.get('eventId').setValue(this.eventId);
    this.commentService.post(this.commentForm.value).subscribe(value => {
      console.log(value);
      this.reloadCurrentRoute();
    },
      error => {
      console.log(error);
      });
  }
  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }
}

