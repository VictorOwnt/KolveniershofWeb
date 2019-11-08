import { Component, OnInit, Input } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Workday } from "src/app/domain/workday.model";
import { MatDialog, MatDialogRef } from "@angular/material";
import { EditWeekScheduleComponent } from "src/app/edit-week-schedule/edit-week-schedule.component";

export interface EditData {
  workday: Workday;
  index: number;
}
@Component({
  selector: "app-voormiddag-week-schedule",
  templateUrl: "./voormiddag-week-schedule.component.html",
  styleUrls: ["./voormiddag-week-schedule.component.css"]
})
export class VoormiddagWeekScheduleComponent implements OnInit {
  editWeekSchedule: MatDialogRef<EditWeekScheduleComponent>;
  @Input() public workday: Workday;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  openEditWeekSchedule() {
    this.editWeekSchedule = this.dialog.open(EditWeekScheduleComponent, {
      data: { workday: this.workday, changeType: "Voormiddag" }
    });
  }
}
