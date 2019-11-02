import { Component, OnInit, Input } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Workday } from 'src/app/domain/workday.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { EditWeekScheduleComponent } from 'src/app/edit-week-schedule/edit-week-schedule.component';

@Component({
  selector: "app-namiddag-week-schedule",
  templateUrl: "./namiddag-week-schedule.component.html",
  styleUrls: ["./namiddag-week-schedule.component.css"]
})
export class NamiddagWeekScheduleComponent implements OnInit {
  editWeekSchedule: MatDialogRef<EditWeekScheduleComponent>;
  @Input() public workday: Workday;
  
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  openEditWeekSchedule() {
    this.editWeekSchedule = this.dialog.open(EditWeekScheduleComponent,{data: { workday: this.workday, changeType: "Namiddag"}});
    
  }
}
