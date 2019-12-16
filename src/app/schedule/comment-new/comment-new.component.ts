import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../authentication/authentication.service';
import {WorkdayDataService} from '../../services/workday.data.service';
import {Comment, Workday} from '../../models/workday.model';
import {Router} from '@angular/router';
import {SuccessModalComponent} from '../../shared/success-modal/success-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ErrorModalComponent} from '../../shared/error-modal/error-modal.component';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.scss']
})
export class CommentNewComponent implements OnInit {
  @Input() private workday: Workday;
  isAdmin = false;
  commentObject: Comment;
  userComment: string;
  public commentForm: FormGroup;

  constructor(
    private auth: AuthenticationService,
    public dialog: MatDialog,
    private workdayDataService: WorkdayDataService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.isAdmin = this.auth.currentUser.admin;
  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      comment: {value: [''], disabled: this.isAdmin}
    });
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
            // TODO - weergeven dat het gelukt is
            console.log(this.commentObject.comment);
            this.dialog.open(SuccessModalComponent, {
              width: '300px',
              data: {message: 'Opmerking aangepast'}
            });
          } else {
            this.dialog.open(ErrorModalComponent, {
              width: '300px',
              data: {message: 'Opmerking aanpassen mislukt'}
            });
          }
        }
      );
    } else {
      this.workdayDataService.postComment(this.workday, new Comment(this.commentForm.value.comment, this.auth.currentUser)).subscribe(
        val => {
          if (val) {
            // TODO - updaten van commentobject, als je nu een comment aanmaakt en direct daarna aanpast, crasht hij
            this.dialog.open(SuccessModalComponent, {
              width: '300px',
              data: {message: 'Opmerking toegevoegd'}
            });
          } else {
            this.dialog.open(ErrorModalComponent, {
              width: '300px',
              data: {message: 'Opmerking toevoegen mislukt'}
            });
          }
        }
      );
    }
  }
}
