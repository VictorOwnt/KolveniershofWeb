import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {AuthenticationService} from '../../user/authentication.service';
import {Router} from '@angular/router';
import {ActivityDataService} from '../../services/activity.data.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Activity } from 'src/app/shared/models/activity.model';
import { FirebaseService } from '../../services/firebase.service';
import { DomSanitizer } from '@angular/platform-browser';

function validate(url: any){
  return (c: FormControl) => {
    console.log(c);
    if (url || c.value !== ''){
      return true;
    } else { return {validate: {
        valid: false
      }
    };
    }
  }

}

@Component({
  selector: 'app-activity-new',
  templateUrl: './activity-new.component.html',
  styleUrls: ['./activity-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityNewComponent implements OnInit {

  public activityForm: FormGroup;
  public errorMsg = '';
  imageUrl: any = null;
  public nieuweData : boolean = false;

  constructor(
      @Inject(MAT_DIALOG_DATA) public activity: Activity,
      public dialogRef: MatDialogRef<ActivityNewComponent>,
      private authService: AuthenticationService,
      private router: Router,
      private fb: FormBuilder,
      private _activityDataService: ActivityDataService,
      private firebaseService: FirebaseService,
      private sanitizer: DomSanitizer
      ) {}

  ngOnInit() {
    if(this.activity) {
      this.imageUrl = " ";
      this.firebaseService.lookupFileDownloadUrl(this.activity.icon).subscribe(img => this.imageUrl = img);
    }
    this.activityForm = this.fb.group({
      name: [this.activity ? this.activity.name : '', Validators.required],
      icon: ['', validate(this.imageUrl)]
    });
  }



  getNameErrorMessage() {
    return (this.activityForm.controls.name.hasError('required'))
        ? 'Naam is verplicht.' : '';
  }

  getIconErrorMessage() {
    return (this.activityForm.controls.icon.hasError('validate'))
        ? '(verplicht)' : '';
  }

  preview(fileInput: any) {
    const fileData = this.firebaseService.handleFile(fileInput);
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      this.nieuweData = true;
    };
  }

  save() {
    if (this.activity) {
console.log(this.activity.icon);
      console.log('icons/icon-' + this.activityForm.value.name);
      if(this.nieuweData){
        const filePath = 'icons/icon-' + this.activityForm.value.name;
        this.firebaseService.uploadFile(filePath);
      }
      this.activity.name = this.activityForm.value.name;
      this._activityDataService.patchActivity(this.activity).subscribe();
    } else {// TODO - doesn't update without refresh
      const filePath = 'icons/icon-' + this.activityForm.value.name;
      this.firebaseService.uploadFile(filePath);
      const activity = new Activity(this.activityForm.value.name, filePath);
      this._activityDataService.postActivity(activity).subscribe(
          val => {
            if (val) {
              if (this.authService.redirectUrl) {
                this.router.navigateByUrl(this.authService.redirectUrl);
                this.authService.redirectUrl = undefined;
              } else {
                this.dialogRef.close();
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
}
