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
  absent = new FormControl();
  lunch = new FormControl();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData,private _userDataService: UserDataService,) { //private formBuilder:FormBuilder // deze methode werkt niet?

  }

  
  ngOnInit() {
    
    this.form = new FormGroup({
      absent: this.absent,
      lunch : this.lunch
    })
    
  }

  onSubmit(){
    switch(this.data$.changeType) { 
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
  handleAlgemeen(){
    this.form.value.absent.forEach(userAbsent => {
      userAbsent.absentDates.push(this.data$.planningDate);
      console.log(`${userAbsent.absentDates[0]}`);
      console.log(`${this.users$[0].absentDates}`);
      //put request 
    /*
    this.userDataService.put(userAbsent.toJson());
    */
    });
  }

  handleVoormiddag(){
    
  }
  handleNamiddag(){
    
  }
  handleExtra(){
    this.data$.workday.lunch.lunch=this.form.value.lunch;
    //put request
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
