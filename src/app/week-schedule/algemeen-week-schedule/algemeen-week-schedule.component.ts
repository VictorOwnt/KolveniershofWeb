import { Component, OnInit, Input } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Workday } from "src/app/domain/workday.model";
import { MatDialogRef, MatDialog } from '@angular/material';
import { EditWeekScheduleComponent } from 'src/app/edit-week-schedule/edit-week-schedule.component';

@Component({
  selector: "app-algemeen-week-schedule",
  templateUrl: "./algemeen-week-schedule.component.html",
  styleUrls: ["./algemeen-week-schedule.component.css"]
})
export class AlgemeenWeekScheduleComponent implements OnInit {
  
  @Input() public workday: Workday;
  editWeekSchedule: MatDialogRef<EditWeekScheduleComponent>;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  openEditWeekSchedule() {
    this.editWeekSchedule = this.dialog.open(EditWeekScheduleComponent,{data: { workday: this.workday, changeType: "Algemeen"}});
    
  }
}
