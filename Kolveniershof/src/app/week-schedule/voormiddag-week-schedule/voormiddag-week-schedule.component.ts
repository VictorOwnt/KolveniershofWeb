import { Component, OnInit, Input } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Workday } from 'src/app/domain/workday.model';

@Component({
  selector: "app-voormiddag-week-schedule",
  templateUrl: "./voormiddag-week-schedule.component.html",
  styleUrls: ["./voormiddag-week-schedule.component.css"]
})
export class VoormiddagWeekScheduleComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  @Input() public workday: Workday;
  constructor() {}

  ngOnInit() {}
}
