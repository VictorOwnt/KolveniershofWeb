import { Component, OnInit } from "@angular/core";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { UserDataService } from '../user/user.data.service';
import { User } from '../user/user.model';
import { Observable } from 'rxjs';
import { WorkDayDataService } from '../workDay.data.service';

@Component({
  selector: "app-picto-agenda",
  templateUrl: "./picto-agenda.component.html",
  styleUrls: ["./picto-agenda.component.css"]
})
export class PictoAgendaComponent implements OnInit {
  faGreaterThan = faGreaterThan;
  faLessThan = faLessThan;

  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  private _users:User[];
  constructor(private _userDataService: UserDataService,private _workdayDataService:WorkDayDataService) {
    this._fetchUsers$.subscribe(users=> this._users =users)
  }

  ngOnInit() {}

  get users$(): Observable<User[]>{

    return this._fetchUsers$;

  }
  showPictoOfUser(index): void{

    const ClickedUser = this._users[index];

    
  }
}
