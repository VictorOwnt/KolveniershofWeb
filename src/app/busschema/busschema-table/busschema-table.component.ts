import { Component, OnInit, Input } from "@angular/core";
import { Workday } from "src/app/domain/workday.model";

@Component({
  selector: "app-busschema-table",
  templateUrl: "./busschema-table.component.html",
  styleUrls: ["./busschema-table.component.scss"]
})
export class BusschemaTableComponent implements OnInit {
  @Input() public workday: Workday;

  constructor() {}

  ngOnInit() {}
}
