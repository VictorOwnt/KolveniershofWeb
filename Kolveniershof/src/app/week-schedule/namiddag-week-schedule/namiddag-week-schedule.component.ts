import { Component, OnInit } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-namiddag-week-schedule",
  templateUrl: "./namiddag-week-schedule.component.html",
  styleUrls: ["./namiddag-week-schedule.component.css"]
})
export class NamiddagWeekScheduleComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  constructor() {}

  ngOnInit() {}
}
