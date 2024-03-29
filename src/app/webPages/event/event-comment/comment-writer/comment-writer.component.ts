import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../../../../services/comment.service';
import {Router} from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-writer',
  templateUrl: './comment-writer.component.html',
  styleUrls: ['./comment-writer.component.css']
})
export class CommentWriterComponent implements OnInit {
  @Input() parentComment: number;
  @Input() eventId: number;
  @Input() isAuthenticate: boolean;
  @Output() commentSent = new EventEmitter<void>();
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
    if (this.isAuthenticate === true){
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
        this.commentSent.emit();
        this.inputValue = '';
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

