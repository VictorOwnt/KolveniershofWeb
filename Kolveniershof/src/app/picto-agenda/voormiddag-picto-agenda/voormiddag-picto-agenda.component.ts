import { Component, OnInit } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-voormiddag-picto-agenda",
  templateUrl: "./voormiddag-picto-agenda.component.html",
  styleUrls: ["./voormiddag-picto-agenda.component.css"]
})
export class VoormiddagPictoAgendaComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  constructor() {}

  ngOnInit() {}
}
