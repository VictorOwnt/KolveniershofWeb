import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Workday } from '../domain/workday.model';
import { EditData } from './editData';
import { Observable } from 'rxjs';
import { User } from '../user/user.model';
import { UserDataService } from '../user/user.data.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-week-schedule',
  templateUrl: './edit-week-schedule.component.html',
  styleUrls: ['./edit-week-schedule.component.css']
})
export class EditWeekScheduleComponent implements OnInit {

  
  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  private _users= this._fetchUsers$.subscribe(users => (this._users = users));
  public form: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData,private _userDataService: UserDataService) { //private formBuilder:FormBuilder // deze methode werkt niet?
    
  }

  
  ngOnInit() {
    
    this.form = new FormGroup({
      absent: new FormControl("absent"),
      lunch : new FormControl("lunch"),
      amActivities: new FormArray([this.createControls("am")]),
      pmActivities: new FormArray([this.createControls("pm")])
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
      //console.log(`${userAbsent.absentDates[0]}`);
      //console.log(`${this.users$[0].absentDates}`);
      //put request 
    /*
    this.userDataService.put(userAbsent.toJson());
    */
    });
  }

  handleVoormiddag(){
    const value = this.form.value.amActivities[0];//get rid of array
    this.data$.workday.amActivities.forEach(amActivity =>{
    let usersToAdd = value[amActivity.activity.name];
    if(typeof(usersToAdd) != "string"){
     
      usersToAdd.forEach(user => amActivity.clients.push(user));
    }
     
    })
  }
  updateActivityName(text:HTMLInputElement,index,type:string){
    if(type === "am")
    this.data$.workday.amActivities[index].activity.name = text.value;
    if(type === "pm")
    this.data$.workday.pmActivities[index].activity.name = text.value;
  }
  handleNamiddag(){
    
    const value = this.form.value.pmActivities[0];    
    this.data$.workday.pmActivities.forEach(pmActivity =>{
      let usersToAdd = value[pmActivity.activity.name];
      usersToAdd.forEach(user => pmActivity.clients.push(user) );
      })
    //put request
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
  
  createControls(activityType:string):FormGroup{
    let formGroup =  new FormGroup({});
    if(activityType === "am"){
      this.data$.workday.amActivities.forEach(amActivity =>{
        formGroup.addControl(amActivity.activity.name,new FormControl(amActivity.activity.name));
      });
    }else if(activityType === "pm"){
      this.data$.workday.pmActivities.forEach(pmActivity =>{
        formGroup.addControl(pmActivity.activity.name,new FormControl(pmActivity.activity.name));
      })
    }
    
    return formGroup;
  }
  
}
