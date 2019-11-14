import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EditData } from './editData';
import { Observable } from 'rxjs';
import { User } from '../user/user.model';
import { UserDataService } from '../services/user.data.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { StaticMethodsPicto } from '../domain/staticMethods';
import { ActivityDataService } from '../services/activity.data.service';
import { WorkDayDataService } from '../services/workDay.data.service';

@Component({
  selector: 'app-edit-week-schedule',
  templateUrl: './edit-week-schedule.component.html',
  styleUrls: ['./edit-week-schedule.component.scss']
})
export class EditWeekScheduleComponent implements OnInit {
  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditData,
    private _userDataService: UserDataService,
    private _activityDataService: ActivityDataService,
    private _workdayDataService: WorkDayDataService
  ) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      absent: new FormControl('absent'),
      lunch: new FormControl('lunch'),
      amActivities: new FormArray([this.createControls('am')]),
      pmActivities: new FormArray([this.createControls('pm')])
    });
  }

  onSubmit() {
    switch (this.data$.changeType) {
      case 'Algemeen': {
        this.handleAlgemeen();
        break;
      }
      case 'Voormiddag': {
        this.handleVoormiddag();
        break;
      }
      case 'Namiddag': {
        this.handleNamiddag();
        break;
      }
      case 'Extra': {
        this.handleExtra();
        break;
      }
    }
  }
  handleAlgemeen() {
    this.form.value.absent.forEach(userAbsent => {
      userAbsent.absentDates.push(this.data$.planningDate);
      this._userDataService.addAbsentDate(userAbsent, StaticMethodsPicto.formattedDate(this.data$.planningDate));
    });
  }

  handleVoormiddag() {
    const value = this.form.value.amActivities[0]; // get rid of array
    this.data$.workday.amActivities.forEach(amActivity => {
      const usersToAdd = value[amActivity.activity.name];
      if (typeof usersToAdd !== 'string') {
        usersToAdd.forEach(user => amActivity.clients.push(user));
      }
      this._activityDataService.updateActivityUnit(amActivity);
    });
  }
  updateActivityName(text: HTMLInputElement, index, type: string) {
    if (type === 'am') {
      this.data$.workday.amActivities[index].activity.name = text.value;
      this._activityDataService.updateActivityUnit(this.data$.workday.amActivities[index]);

    }
    if (type === 'pm') {
      this.data$.workday.pmActivities[index].activity.name = text.value;
      this._activityDataService.updateActivityUnit(this.data$.workday.pmActivities[index]);
    }

  }
  handleNamiddag() {
    const value = this.form.value.pmActivities[0];
    this.data$.workday.pmActivities.forEach(pmActivity => {
      const usersToAdd = value[pmActivity.activity.name];
      usersToAdd.forEach(user => pmActivity.clients.push(user));
      this._activityDataService.updateActivityUnit(pmActivity);
    });

  }
  handleExtra() {
    this.data$.workday.lunch.lunch = this.form.value.lunch;
    this._workdayDataService.updateLunch(this.data$.workday.lunch);
  }
  get users$(): Observable<User[]> {
    return this._fetchUsers$;
  }
  get data$(): EditData {
    return this.data;
  }
  get userDataService(): UserDataService {
    return this._userDataService;
  }

  createControls(activityType: string): FormGroup {
    const formGroup = new FormGroup({});
    if (activityType === 'am') {
      this.data$.workday.amActivities.forEach(amActivity => {
        formGroup.addControl(
          amActivity.activity.name,
          new FormControl(amActivity.activity.name)
        );
      });
    } else if (activityType === 'pm') {
      this.data$.workday.pmActivities.forEach(pmActivity => {
        formGroup.addControl(
          pmActivity.activity.name,
          new FormControl(pmActivity.activity.name)
        );
      });
    }

    return formGroup;
  }
}
