import { Component, OnInit, Input } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Workday } from 'src/app/domain/workday.model';

@Component({
  selector: "app-namiddag-week-schedule",
  templateUrl: "./namiddag-week-schedule.component.html",
  styleUrls: ["./namiddag-week-schedule.component.css"]
})
export class NamiddagWeekScheduleComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  @Input() public workday: Workday;
  constructor() {}

  ngOnInit() {}
}
