import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as $ from 'jquery';
import {AuthenticationService} from '../../authentication/authentication.service';
import {WorkdayDataService} from '../../services/workday.data.service';
import {Workday, Comment} from '../../models/workday.model';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.scss']
})
export class CommentNewComponent implements OnInit {
  @Input() private workday: Workday;
  isAdmin = true;
  commentObject: Comment;
  userComment: string;
  public commentForm: FormGroup;
  public errorMsg = '';

  constructor(
      private auth: AuthenticationService,
      private workdayDataService: WorkdayDataService,
      private router: Router,
      private fb: FormBuilder
      ) {}

  ngOnInit() {
    this.commentForm = this.fb.group({
      comment: ['']
    });
    this.isAdmin = this.auth.currentUser.admin;
    this.commentObject = this.getUserComment();
  }

  getUserComment(): Comment {
    const comment = this.workday.comments.find(uComment => uComment.client = this.auth.currentUser);
    if (comment) {
      this.userComment = comment.comment;
    } else {
      this.userComment = null;
    }
    return comment;
  }

  onChange(e) {
    this.userComment = e;
  }

  save() {
    if (this.commentObject) {
      this.commentObject.comment = this.userComment;
      this.workdayDataService.patchComment(this.workday, this.commentObject).subscribe(
        val => {
          if (val) {
            if (this.auth.redirectUrl) {
              this.router.navigateByUrl(this.auth.redirectUrl);
              this.auth.redirectUrl = undefined;
            } else {
              // TODO - weergeven dat het gelukt is
              console.log(this.commentObject.comment);
              console.log('Opmerking aangepast');
            }
          } else {
            this.errorMsg = `Opmerking aanpassen mislukt`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMsg = `${err.error.message}`;
          } else {
            this.errorMsg = `${err.error}`;
          }
          $('#errorMsg').slideDown(200);
        }
      );
    } else {
      this.workdayDataService.postComment(this.workday, new Comment(this.commentForm.value.comment, this.auth.currentUser)).subscribe(
        val => {
          if (val) {
            if (this.auth.redirectUrl) {
              this.router.navigateByUrl(this.auth.redirectUrl);
              this.auth.redirectUrl = undefined;
            } else {
              // TODO - updaten van commentobject, als je nu een comment aanmaakt en direct daarna aanpast, crasht hij
              // TODO - weergeven dat het gelukt is
              console.log('Opmerking toegevoegd');
            }
          } else {
            this.errorMsg = `Opmerking toevoegen mislukt`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMsg = `${err.error.message}`;
          } else {
            this.errorMsg = `${err.error}`;
          }
          $('#errorMsg').slideDown(200);
        }
      );
    }
  }
}
