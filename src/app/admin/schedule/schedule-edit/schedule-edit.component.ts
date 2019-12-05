import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthenticationService} from '../../../user/authentication.service';
import {ActivityUnit} from '../../../shared/models/activityUnit.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../../services/firebase.service';
import {Observable} from 'rxjs';
import {ActivityDataService} from '../../../services/activity.data.service';
import {Activity} from '../../../shared/models/activity.model';
import {map, startWith} from 'rxjs/operators';
import {User} from '../../../shared/models/user.model';
import {UserDataService} from '../../../services/user.data.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss'],
})
export class ScheduleEditComponent implements OnInit {
  unit: any = null;
  activities: Activity[] = [];
  activityImgUrl: any = null;
  mentors: User[] = [];
  clients: User[] = [];
  isActivity = false;
  filteredActivities: Observable<Activity[]>;
  public unitFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private activityDataService: ActivityDataService,
    /*private lunchDataService: LunchDataService,*/
    private userDataService: UserDataService
  ) {
    this.unit = data;
    this.isActivity = data instanceof ActivityUnit;
    activityDataService.activities$.subscribe(activities => this.activities = activities);
    userDataService.mentors$.subscribe(mentors => this.mentors = mentors);
    userDataService.clients$.subscribe(clients => this.clients = clients);
  }

  ngOnInit() {
    if (this.isActivity) {
      if (this.unit) {
        // Download activity icon
        this.activityImgUrl = '';
        this.firebaseService.lookupFileDownloadUrl(this.unit.activity.icon, 'icon').subscribe(img => this.activityImgUrl = img);
      }
      // FormGroup for activityUnit
      this.unitFormGroup = this.fb.group({
        activity: [this.unit ? this.unit.activity : null, Validators.required],
        mentors: [this.unit ? this.unit.mentors : null, Validators.required],
        clients: [this.unit ? this.unit.clients : null, Validators.required]
      });
      // Filter activities
      this.filteredActivities = this.unitFormGroup.controls.activity.valueChanges
        .pipe(startWith(''), map(value => this._filterActivities(value)));
    } else {
      // FormGroup for lunchUnit
      this.unitFormGroup = this.fb.group({
        lunch: [this.unit ? this.unit.lunch : null, Validators.required],
        mentors: [this.unit ? this.unit.mentors : null, Validators.required],
        clients: [this.unit ? this.unit.clients : null, Validators.required]
      });
    }
  }

  private _filterActivities(value: string): Activity[] {
    const filterValue = value.toLowerCase().trim();
    return this.activities.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  compareUsers(user1: User, user2: User) {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  previewActivity(activity: Activity) {
    this.firebaseService.lookupFileDownloadUrl(activity.icon, 'icon').subscribe(x => this.activityImgUrl = x);
  }

  submitUnit() {
    console.warn(this.unitFormGroup);
  }

}
