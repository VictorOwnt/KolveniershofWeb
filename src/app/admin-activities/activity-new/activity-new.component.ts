import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from "@angular/material/dialog";
import {ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as zxcvbn from 'zxcvbn';
import * as $ from 'jquery';
import {AuthenticationService} from "../../user/authentication.service";
import {Router} from "@angular/router";
import {ActivityDataService} from "../../services/activity.data.service";
import {UserDataService} from "../../services/user.data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Activity} from "../../shared/models/activity.model";

function validate(url : any){
  return (c: FormControl) => {
    console.log(c);
    if(url || c.value != ""){
      console.log("test");
     return true;
    }else return {validate: {
        valid: false
      }
    };
  }

}

@Component({
  selector: 'app-activity-new',
  templateUrl: './activity-new.component.html',
  styleUrls: ['./activity-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityNewComponent implements OnInit {
  public activity: Activity = null;
  public activityForm: FormGroup;
  public errorMsg = '';
  imageUrl: any = null;
  fileData: File = null;
  filePath: string = null;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: Activity,
      public dialogRef: MatDialogRef<ActivityNewComponent>,
      private authService: AuthenticationService,
      private router: Router,
      private fb: FormBuilder,
      private _activityDataService: ActivityDataService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if(this.data) {
      this.activity = Activity.fromJSON(this.data);
      this.imageUrl = "assets/img/icons/icon-" + this.activity.icon + ".svg";
    }
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
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
        this._activityDataService.postActivity(this.activityForm.value.name, this.imageUrl).subscribe(
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
