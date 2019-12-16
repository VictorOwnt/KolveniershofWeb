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
  comment: Comment = null;
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
    this.comment = this.workday.comments[0];
    this.commentForm = this.fb.group({
      comment: {value: [this.comment ? this.comment.comment : ''], disabled: this.isAdmin}
    });
  }

  // Save comment to backend
  save() {
    if (this.comment) {
      // Patch comment (comment was already present)
      this.comment.comment = this.commentForm.value.comment.trim();
      this.workdayDataService.patchComment(this.workday, this.comment).subscribe(
        val => {
          if (val) {
            this.comment = val as Comment;
            // Success dialog
            this.dialog.open(SuccessModalComponent, {
              width: '300px',
              data: {message: 'Opmerking aangepast'}
            });
          } else {
            // Error dialog
            this.dialog.open(ErrorModalComponent, {
              width: '300px',
              data: {message: 'Opmerking aanpassen mislukt'}
            });
          }
        }
      );
    } else {
      // Post comment (no comment yet)
      this.workdayDataService.postComment(
        this.workday, new Comment(this.commentForm.value.comment.trim(), this.auth.currentUser)
      ).subscribe(
        val => {
          if (val) {
            this.comment = val as Comment;
            // Success dialog
            this.dialog.open(SuccessModalComponent, {
              width: '300px',
              data: {message: 'Opmerking toegevoegd'}
            });
          } else {
            // Error dialog
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
