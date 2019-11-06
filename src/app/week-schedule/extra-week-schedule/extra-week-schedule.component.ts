import { Component, OnInit, Input } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Workday } from 'src/app/domain/workday.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { EditWeekScheduleComponent } from 'src/app/edit-week-schedule/edit-week-schedule.component';

@Component({
  selector: "app-extra-week-schedule",
  templateUrl: "./extra-week-schedule.component.html",
  styleUrls: ["./extra-week-schedule.component.css"]
})
export class ExtraWeekScheduleComponent implements OnInit {
  editWeekSchedule: MatDialogRef<EditWeekScheduleComponent>;
  @Input() public workday: Workday;
  
  constructor(private dialog: MatDialog) {
    
  }

  ngOnInit() {
    
  }
  openEditWeekSchedule() {
    this.editWeekSchedule = this.dialog.open(EditWeekScheduleComponent,{data: { workday: this.workday, changeType: "Extra"}});
    
  }
  get food$():string{
    return this.workday.lunch.lunch;
  }
}
