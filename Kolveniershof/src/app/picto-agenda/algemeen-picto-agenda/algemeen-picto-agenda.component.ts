import { Component, OnInit } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-algemeen-picto-agenda",
  templateUrl: "./algemeen-picto-agenda.component.html",
  styleUrls: ["./algemeen-picto-agenda.component.css"]
})
export class AlgemeenPictoAgendaComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  constructor() {}

  ngOnInit() {}
}
