import { Component, OnInit } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-extra-week-schedule",
  templateUrl: "./extra-week-schedule.component.html",
  styleUrls: ["./extra-week-schedule.component.css"]
})
export class ExtraWeekScheduleComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  constructor() {}

  ngOnInit() {}
}
