import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivityDataService} from '../../../services/activity.data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Activity} from 'src/app/models/activity.model';
import {FirebaseService} from '../../../services/firebase.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ErrorModalComponent} from '../../../shared/error-modal/error-modal.component';

@Component({
  selector: 'app-activity-new',
  templateUrl: './activity-new.component.html',
  styleUrls: ['./activity-new.component.scss']
})
export class ActivityNewComponent implements OnInit {
  activity: Activity;
  public activityForm: FormGroup;
  imageUrl: any = null;
  public isNew = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ActivityNewComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private activityDataService: ActivityDataService,
    private firebaseService: FirebaseService,
    private sanitizer: DomSanitizer
  ) {
    this.activity = data.activity;
  }

  ngOnInit() {
    if (this.activity) {
      this.imageUrl = '';
      this.firebaseService.lookupFileDownloadUrl(this.activity.icon, 'icon').subscribe(img => this.imageUrl = img);
    }
    this.activityForm = this.fb.group({
      name: [this.activity ? this.activity.name : '', Validators.required],
      icon: ['']
    });
  }

  getNameErrorMessage() {
    return (this.activityForm.controls.name.hasError('required'))
      ? 'Naam is verplicht.' : '';
  }

  getIconErrorMessage() {
    return (this.activityForm.controls.icon.hasError('validate'))
      ? 'Een icoon uploaden is verplicht.' : '';
  }

  preview(fileInput: any) {
    const fileData = this.firebaseService.handleFile(fileInput);
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (event) => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      this.isNew = true;
    };
  }

  save() {
    if (this.activity) {
      if (this.isNew) {
        const filePath = 'icons/icon-' + this.activityForm.value.name.trim().replace(/\s+/g, '-').toLowerCase();
        const fileUploaded = this.firebaseService.uploadFile(filePath);
        this.activity.icon = fileUploaded ? filePath : this.activity.icon;
      }
      this.activity.name = this.activityForm.value.name;
      this.activityDataService.patchActivity(this.activity).subscribe(
        val => {
          if (val) {
            // Success modal
            this.dialogRef.close('Atelier aangepast.');
          } else {
            // Error modal
            this.dialogRef.close(false);
          }
        },
        (err: HttpErrorResponse) => {
          // Open error dialog
          this.dialog.open(ErrorModalComponent, {
            width: '300px',
            data: {message: err.error instanceof Error ? err.error.message : err.error}
          });
        }
      );
    } else {// TODO - doesn't update without refresh
      const filePath = 'icons/icon-' + this.activityForm.value.name.trim().replace(/\s+/g, '-').toLowerCase();
      const fileUploaded = this.firebaseService.uploadFile(filePath);
      const activity = new Activity(this.activityForm.value.name, filePath);
      if (fileUploaded) {
        this.activityDataService.postActivity(activity).subscribe(
          val => {
            if (val) {
              // Success modal
              this.dialogRef.close('Atelier aangemaakt.');
            } else {
              // Error modal
              this.dialogRef.close(false);
            }
          },
          (err: HttpErrorResponse) => {
            // Open error dialog
            this.dialog.open(ErrorModalComponent, {
              width: '300px',
              data: {message: err.error instanceof Error ? err.error.message : err.error}
            });
          }
        );
      } else {
        this.dialog.open(ErrorModalComponent, {
          width: '300px',
          data: {message: 'Je moet nog een icoon uploaden.'}
        });
      }
    }
  }
}
