import { Component, OnInit } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-extra-picto-agenda",
  templateUrl: "./extra-picto-agenda.component.html",
  styleUrls: ["./extra-picto-agenda.component.css"]
})
export class ExtraPictoAgendaComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  constructor() {}

  ngOnInit() {}
}
