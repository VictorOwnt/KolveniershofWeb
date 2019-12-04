import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../../user/authentication.service';
import {ActivityUnit} from '../../../shared/models/activityUnit.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../../services/firebase.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {ActivityDataService} from '../../../services/activity.data.service';
import {Activity} from '../../../shared/models/activity.model';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss'],
})
export class ScheduleEditComponent implements OnInit {
  activities: Activity[];
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  public activityUnitForm: FormGroup;
  public errorMsg = '';
  imageUrl: any = null;

  constructor(
      @Inject(MAT_DIALOG_DATA) public activityUnit: ActivityUnit,
      public dialogRef: MatDialogRef<ScheduleEditComponent>,
      private fb: FormBuilder,
      private auth: AuthenticationService,
      private firebaseService: FirebaseService,
      private sanitizer: DomSanitizer,
      private activityDataService: ActivityDataService) {

  }
  ngOnInit() {
    if (this.activityUnit) {
      this.imageUrl = '';
      this.firebaseService.lookupFileDownloadUrl(this.activityUnit.activity.icon, 'icon').subscribe(img => this.imageUrl = img);
    }

    this.activityUnitForm = this.fb.group({
      name: [this.activityUnit ? this.activityUnit.activity.name : '', Validators.required],
    });

    this.activityDataService.activities$.subscribe( a => a.forEach(act => this.options.push(act.name)));
    this.activityDataService.activities$.subscribe(ac => this.activities = ac);

    this.filteredOptions = this.myControl.valueChanges
        .pipe(
            startWith(''),
            map(value => this._filter(value))
        );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  preview(fileInput: any) {
    const activity = this.activities.filter( a => a.name === fileInput.valueOf() );
    this.firebaseService.lookupFileDownloadUrl(activity[0].icon, 'icon').subscribe(x => this.imageUrl = x);

  }

}
