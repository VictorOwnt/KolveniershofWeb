import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Workday } from '../domain/workday.model';
import { EditData } from './editData';
import { Observable } from 'rxjs';
import { User } from '../user/user.model';
import { UserDataService } from '../user/user.data.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-week-schedule',
  templateUrl: './edit-week-schedule.component.html',
  styleUrls: ['./edit-week-schedule.component.css']
})
export class EditWeekScheduleComponent implements OnInit {

  
  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  private _users= this._fetchUsers$.subscribe(users => (this._users = users));
  public form: FormGroup;
  //sick = new FormControl();
  absent = new FormControl();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData,private _userDataService: UserDataService,private formBuilder:FormBuilder,) { 

  }

  
  ngOnInit() {
    
    this.form = new FormGroup({
      absent: this.absent
      //sick: this.sick
    })
    
  }

  onSubmit(){
    
    this.form.value.absent.forEach(userAbsent => {
      userAbsent.absentDates.push(this.data$.planningDate);
      console.log(`${userAbsent.absentDates[0]}`);
      //put request 
    /*
    this.userDataService.put(userAbsent.toJson());
    */
    });
    
  }
  get users$(): User[]{
    return this._users;
  }
  get data$(): EditData{
    return this.data;
  }
  get userDataService() : UserDataService{
    return this._userDataService;
  }
  
}
