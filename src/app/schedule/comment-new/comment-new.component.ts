import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {AuthenticationService} from '../../authentication/authentication.service';
import {WorkdayDataService} from '../../services/workday.data.service';
import {UserDataService} from '../../services/user.data.service';
import { FirebaseService } from '../../services/firebase.service';
import {Workday, Comment} from '../../models/workday.model';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.scss']
})
export class CommentNewComponent implements OnInit {

  public commentForm: FormGroup;
  public imageUrl: any = null;
  public client: User;
  public errorMsg = '';

  constructor(
      @Inject(MAT_DIALOG_DATA) public workday: Workday,
      public dialogRef: MatDialogRef<CommentNewComponent>,
      private authService: AuthenticationService,
      private workdayDataService: WorkdayDataService,
      private userDataService: UserDataService,
      private firebaseService: FirebaseService,
      private router: Router,
      private fb: FormBuilder
      ) {}

  async ngOnInit() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]]
    });
    await this.getLoggedInUser();
    await this.getImageUrl();
  }

  async getLoggedInUser() {
    const userid = this.authService.currentUser.id;
    return new Promise( (resolve, reject) => {
      this.userDataService.getUserById(userid).toPromise()
      .then(user => resolve(this.client = user))
      .catch((e) => reject(e));
    })
    .catch((err) => console.log(err));
  }

  async getImageUrl() {
    return new Promise( (resolve, reject) => {
      this.firebaseService.lookupFileDownloadUrl(this.client.picture, 'user').toPromise()
      .then(img => resolve(this.imageUrl = img))
      .catch((e) => reject(e));
    })
    .catch((err) => console.log(err));
  }


  getCommentErrorMessage() {
    return (this.commentForm.controls.comment.hasError('required'))
        ? 'Opmerking is verplicht.' : '';
  }

  save() {
      this.workday.comments.push(new Comment(this.commentForm.value.comment, this.client));
      /*
      this.workdayDataService.patchWorkday(this.workday).subscribe(
        val => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.dialogRef.close();
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
    );*/
  }
}
