import { Component, OnInit, Input } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { WorkDayDataService } from "src/app/workDay.data.service";
import { Workday } from "src/app/domain/workday.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

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
