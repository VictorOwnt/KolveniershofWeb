import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from "@angular/material/dialog";
import {ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as zxcvbn from 'zxcvbn';
import * as $ from 'jquery';
import {AuthenticationService} from "../../user/authentication.service";
import {Router} from "@angular/router";
import {ActivityDataService} from "../../services/activity.data.service";
import {UserDataService} from "../../services/user.data.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-activity-new',
  templateUrl: './activity-new.component.html',
  styleUrls: ['./activity-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityNewComponent implements OnInit {
  public activity: FormGroup;
  public errorMsg = '';
  imageUrl: any = null;
  fileData: File = null;
  filePath: string = null;

  constructor(
      public dialogRef: MatDialogRef<ActivityNewComponent>,
      private authService: AuthenticationService,
      private router: Router,
      private fb: FormBuilder,
      private _activityDataService: ActivityDataService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.activity = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  getNameErrorMessage() {
    return (this.activity.controls.name.hasError('required'))
        ? 'Naam is verplicht.' : '';
  }

  getIconErrorMessage() {
    return (this.activity.controls.icon.hasError('required'))
        ? '(verplicht)' : '';
  }

  preview(fileInput: any) {
    this.fileData = (fileInput.target.files[0] as File);

    const fileType = this.fileData.type;
    if (fileType.match(/image\/*/) == null) {
      console.log('no image');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
  }

  save() {
        this._activityDataService.postActivity(this.activity.value.name, this.imageUrl).subscribe(
            val => {
              if (val) {
                if (this.authService.redirectUrl) {
                  this.router.navigateByUrl(this.authService.redirectUrl);
                  this.authService.redirectUrl = undefined;
                } else {
                  this.router.navigate(['/activities']); // TODO
                }
              } else {
                this.errorMsg = `Activiteit aanmaken mislukt`;
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
