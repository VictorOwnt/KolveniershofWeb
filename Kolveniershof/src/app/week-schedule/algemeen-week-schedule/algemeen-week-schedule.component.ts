import { Component, OnInit, Input } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Workday } from "src/app/domain/workday.model";

@Component({
  selector: "app-algemeen-week-schedule",
  templateUrl: "./algemeen-week-schedule.component.html",
  styleUrls: ["./algemeen-week-schedule.component.css"]
})
export class AlgemeenWeekScheduleComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  @Input() public workday: Workday;
  constructor() {}

  ngOnInit() {}
}
