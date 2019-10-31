import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Workday } from '../domain/workday.model';
import { EditData } from './editData';

@Component({
  selector: 'app-edit-week-schedule',
  templateUrl: './edit-week-schedule.component.html',
  styleUrls: ['./edit-week-schedule.component.css']
})
export class EditWeekScheduleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditData) { 
    console.log(`${data.workday.amActivities[data.index].activity.name}`);
    //console.log(`${data}`);
  }

  
  ngOnInit() {
  }

}
