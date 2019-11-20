import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from "@angular/material/dialog";
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-activity-new',
  templateUrl: './activity-new.component.html',
  styleUrls: ['./activity-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityNewComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ActivityNewComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
