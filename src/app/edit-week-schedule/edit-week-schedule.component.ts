<<<<<<< HEAD
import { Component, OnInit, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Workday } from "../domain/workday.model";
import { EditData } from "./editData";
import { Observable } from "rxjs";
import { User } from "../user/user.model";
import { UserDataService } from "../user/user.data.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";
=======
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { EditData } from "./editData";
import { Observable } from "rxjs";
import { User } from "../user/user.model";
import { UserDataService } from "../services/user.data.service";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { StaticMethodsPicto } from '../domain/staticMethods';
import { ActivityDataService } from '../services/activity.data.service';
import { WorkDayDataService } from '../services/workDay.data.service';
>>>>>>> refs/heads/Add-Comment-Picto-Agenda

@Component({
  selector: "app-edit-week-schedule",
  templateUrl: "./edit-week-schedule.component.html",
  styleUrls: ["./edit-week-schedule.component.css"]
})
export class EditWeekScheduleComponent implements OnInit {
<<<<<<< HEAD
  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  private _users = this._fetchUsers$.subscribe(users => (this._users = users));
=======
  private _fetchUsers$: Observable<User[]> = this._userDataService.users$; 
>>>>>>> refs/heads/Add-Comment-Picto-Agenda
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditData,
<<<<<<< HEAD
    private _userDataService: UserDataService
  ) {
    // private formBuilder:FormBuilder // deze methode werkt niet?
=======
    private _userDataService: UserDataService,
    private _activityDataService: ActivityDataService,
    private _workdayDataService: WorkDayDataService
  ) {

>>>>>>> refs/heads/Add-Comment-Picto-Agenda
  }

  ngOnInit() {
    this.form = new FormGroup({
      absent: new FormControl("absent"),
      lunch: new FormControl("lunch"),
      amActivities: new FormArray([this.createControls("am")]),
      pmActivities: new FormArray([this.createControls("pm")])
    });
  }

  onSubmit() {
    switch (this.data$.changeType) {
      case "Algemeen": {
        this.handleAlgemeen();
        break;
      }
      case "Voormiddag": {
        this.handleVoormiddag();
        break;
      }
      case "Namiddag": {
        this.handleNamiddag();
        break;
      }
      case "Extra": {
        this.handleExtra();
        break;
      }
    }
  }
  handleAlgemeen() {
    this.form.value.absent.forEach(userAbsent => {
      userAbsent.absentDates.push(this.data$.planningDate);
<<<<<<< HEAD
      console.log(`${userAbsent.absentDates[0]}`);
      console.log(`${this.users$[0].absentDates}`);
      // put request
      /*
    this.userDataService.put(userAbsent.toJson());
    */
=======
      this._userDataService.addAbsentDate(userAbsent, StaticMethodsPicto.formattedDate(this.data$.planningDate));
>>>>>>> refs/heads/Add-Comment-Picto-Agenda
    });
  }

  handleVoormiddag() {
    const value = this.form.value.amActivities[0]; // get rid of array
    this.data$.workday.amActivities.forEach(amActivity => {
      const usersToAdd = value[amActivity.activity.name];
      if (typeof usersToAdd !== "string") {
        usersToAdd.forEach(user => amActivity.clients.push(user));
      }
<<<<<<< HEAD
=======
      this._activityDataService.updateActivityUnit(amActivity);
>>>>>>> refs/heads/Add-Comment-Picto-Agenda
    });
  }
  updateActivityName(text: HTMLInputElement, index, type: string) {
    if (type === "am") {
      this.data$.workday.amActivities[index].activity.name = text.value;
<<<<<<< HEAD
    }
    if (type === "pm") {
      this.data$.workday.pmActivities[index].activity.name = text.value;
    }
=======
      this._activityDataService.updateActivityUnit(this.data$.workday.amActivities[index]);

    }
    if (type === "pm") {
      this.data$.workday.pmActivities[index].activity.name = text.value;
      this._activityDataService.updateActivityUnit(this.data$.workday.pmActivities[index]);
    }
    
>>>>>>> refs/heads/Add-Comment-Picto-Agenda
  }
  handleNamiddag() {
    const value = this.form.value.pmActivities[0];
    this.data$.workday.pmActivities.forEach(pmActivity => {
      const usersToAdd = value[pmActivity.activity.name];
      usersToAdd.forEach(user => pmActivity.clients.push(user));
<<<<<<< HEAD
    });
    // put request
  }
  handleExtra() {
    this.data$.workday.lunch.lunch = this.form.value.lunch;
    // put request
  }
  get users$(): User[] {
    return this._users;
=======
      this._activityDataService.updateActivityUnit(pmActivity);
    });
    
  }
  handleExtra() {
    this.data$.workday.lunch.lunch = this.form.value.lunch;
    this._workdayDataService.updateLunch(this.data$.workday.lunch);
  }
  get users$(): Observable<User[]> {
    return this._fetchUsers$;
>>>>>>> refs/heads/Add-Comment-Picto-Agenda
  }
  get data$(): EditData {
    return this.data;
  }
  get userDataService(): UserDataService {
    return this._userDataService;
  }

  createControls(activityType: string): FormGroup {
    const formGroup = new FormGroup({});
    if (activityType === "am") {
      this.data$.workday.amActivities.forEach(amActivity => {
        formGroup.addControl(
          amActivity.activity.name,
          new FormControl(amActivity.activity.name)
        );
      });
    } else if (activityType === "pm") {
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
