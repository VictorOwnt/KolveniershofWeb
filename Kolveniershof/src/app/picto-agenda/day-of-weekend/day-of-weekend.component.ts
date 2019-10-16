import { Component, OnInit } from "@angular/core";

export interface Day {
  id: number;
  name: string;
  date: Date;
}

@Component({
  selector: "app-day-of-weekend",
  templateUrl: "./day-of-weekend.component.html",
  styleUrls: ["./day-of-weekend.component.css"]
})
export class DayOfWeekendComponent implements OnInit {
  zaterdag: Day = {
    id: 0,
    name: "Zaterdag",
    date: new Date(2019, 10, 6)
  };
  zondag: Day = {
    id: 1,
    name: "Zondag",
    date: new Date(2019, 10, 7)
  };

  constructor() {}

  ngOnInit() {}
}
