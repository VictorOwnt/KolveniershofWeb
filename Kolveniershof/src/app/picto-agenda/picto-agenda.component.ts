import { Component, OnInit } from "@angular/core";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-picto-agenda",
  templateUrl: "./picto-agenda.component.html",
  styleUrls: ["./picto-agenda.component.css"]
})
export class PictoAgendaComponent implements OnInit {
  faGreaterThan = faGreaterThan;
  faLessThan = faLessThan;

  constructor() {}

  ngOnInit() {}
}
