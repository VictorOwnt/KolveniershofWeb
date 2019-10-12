import { Component, OnInit } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-namiddag-picto-agenda",
  templateUrl: "./namiddag-picto-agenda.component.html",
  styleUrls: ["./namiddag-picto-agenda.component.css"]
})
export class NamiddagPictoAgendaComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  constructor() {}

  ngOnInit() {}
}
