import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MatDatepickerInputEvent } from "@angular/material";
import { BusUnitDataService } from "../busUnit.data.service";

@Component({
  selector: "app-busschema",
  templateUrl: "./busschema.component.html",
  styleUrls: ["./busschema.component.css"]
})
export class BusschemaComponent implements OnInit {
  ngOnInit() {}
}
