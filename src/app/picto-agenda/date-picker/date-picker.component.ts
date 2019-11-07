import { Component, OnInit } from "@angular/core";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.css"]
})
export class DatePickerComponent implements OnInit {
  faGreaterThan = faGreaterThan;
  faLessThan = faLessThan;
  constructor() {}

  ngOnInit() {}

  // deze component wordt niet meer gebruikt
}
