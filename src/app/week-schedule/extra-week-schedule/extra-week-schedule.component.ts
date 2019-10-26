import { Component, OnInit, Input } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Workday } from 'src/app/domain/workday.model';

@Component({
  selector: "app-extra-week-schedule",
  templateUrl: "./extra-week-schedule.component.html",
  styleUrls: ["./extra-week-schedule.component.css"]
})
export class ExtraWeekScheduleComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  @Input() public workday: Workday;
  constructor() {}

  ngOnInit() {}
}
