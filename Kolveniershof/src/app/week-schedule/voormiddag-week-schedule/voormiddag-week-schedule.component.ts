import { Component, OnInit } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-voormiddag-week-schedule",
  templateUrl: "./voormiddag-week-schedule.component.html",
  styleUrls: ["./voormiddag-week-schedule.component.css"]
})
export class VoormiddagWeekScheduleComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  constructor() {}

  ngOnInit() {}
}
