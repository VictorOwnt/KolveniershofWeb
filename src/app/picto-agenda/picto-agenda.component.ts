import { Component, OnInit } from "@angular/core";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { UserDataService } from "../user/user.data.service";
import { User } from "../user/user.model";
import { Observable } from "rxjs";
import { WorkDayDataService } from "../workDay.data.service";

@Component({
  selector: "app-picto-agenda",
  templateUrl: "./picto-agenda.component.html",
  styleUrls: ["./picto-agenda.component.css"]
})
export class PictoAgendaComponent implements OnInit {
  faGreaterThan = faGreaterThan;
  faLessThan = faLessThan;
  val:Date;

  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  private _users: User[];
  private workDays = [];
  constructor(
    private _userDataService: UserDataService,
    private _workdayDataService: WorkDayDataService
  ) {
    this._fetchUsers$.subscribe(users => (this._users = users));
    this.showPictoOfUser();
  }

  ngOnInit() {}

  get users$(): Observable<User[]> {
    return this._fetchUsers$;
  }
  showPictoOfUser(index?:number): void {
    
    let clickedUser = User.fromJSON(JSON.parse(localStorage.getItem("currentUser")));
    
    if(index){
      clickedUser = this._users[index];
    }
    let currentWeek = this.getCurrentWeek();
    if(this.val){
     currentWeek = this.getCurrentWeek(this.val);
    }   
    let date;
    let workday;
    
    for (let i = 0; i < currentWeek.length; i++) {
      date = currentWeek[i];

      this._workdayDataService
        .getWeekOfUser(clickedUser.id, date)
        .subscribe(wd => (workday = wd));
      this.workDays.push(workday);
    }
  }

  getCurrentWeek(date?:Date): Date[] {
    let chosenDate: Date = new Date();
    if(date){
      chosenDate = date;
    }
    
    let week = [];
    for (let i = 1; i <= 7; i++) {
      let first = chosenDate.getDate() - chosenDate.getDay() + i;
      let day = new Date(chosenDate.setDate(first)); //.toISOString().slice(0, 10)

      week.push(this.formattedDate(day));
    }
    return week;
  }
  formattedDate(d) {
    let month = String(d.getMonth()+1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return `${day}_${month}_${year}`;
  }

  isAdmin() : boolean{
    return User.fromJSON(JSON.parse(localStorage.getItem("currentUser"))).admin;
    }
}
