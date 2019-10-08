import { Component, OnInit } from "@angular/core";

export interface Day {
  id: number;
  date: Date;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-week-schedule",
  templateUrl: "./week-schedule.component.html",
  styleUrls: ["./week-schedule.component.css"]
})
export class WeekScheduleComponent implements OnInit {
  monday: Day = {
    id: 1,
    date: new Date(2019, 9, 30),
    text: "Monday",
    cols: 1,
    rows: 2
  };
  tuesday: Day = {
    id: 2,
    date: new Date(2019, 10, 1),
    text: "Tuesday",
    cols: 1,
    rows: 2
  };
  wednesday: Day = {
    id: 3,
    date: new Date(2019, 10, 2),

    text: "Wednesday",
    cols: 1,
    rows: 2
  };
  thursday: Day = {
    id: 4,
    date: new Date(2019, 10, 3),
    text: "Thursday",
    cols: 1,
    rows: 2
  };
  friday: Day = {
    id: 5,
    date: new Date(2019, 10, 4),
    text: "Friday",
    cols: 1,
    rows: 2
  };
  saturday: Day = {
    id: 6,
    date: new Date(2019, 10, 5),
    text: "Saturday",
    cols: 1,
    rows: 1
  };
  sunday: Day = {
    id: 7,
    date: new Date(2019, 10, 6),
    text: "Sunday",
    cols: 1,
    rows: 1
  };

  constructor() {}

  ngOnInit() {}
}
