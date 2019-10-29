import { Component, OnInit } from "@angular/core";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { UserDataService } from "../user/user.data.service";
import { User } from "../user/user.model";
import { Observable } from "rxjs";
import { WorkDayDataService } from "../workDay.data.service";
import { Workday } from "../domain/workday.model";

@Component({
  selector: "app-picto-agenda",
  templateUrl: "./picto-agenda.component.html",
  styleUrls: ["./picto-agenda.component.css"]
})
export class PictoAgendaComponent implements OnInit {
  faGreaterThan = faGreaterThan;
  faLessThan = faLessThan;
  val: Date; //= new Date(new Date().getFullYear(), 0, 1);

  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  private _users: User[];
  private workDays;

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

  showPictoOfUser(index?: number): void {
    this.workDays = [];
    let clickedUser = User.fromJSON(
      JSON.parse(localStorage.getItem("currentUser"))
    );

    if (index) {
      clickedUser = this._users[index];
    }
    let currentWeek = this.getCurrentWeek();
    if (this.val) {
      currentWeek = this.getCurrentWeek(this.val);
    }

    let date: Date;
    let workday: Workday;
    for (let i = 0; i < currentWeek.length; i++) {
      date = currentWeek[i];

      this._workdayDataService
        .getWeekOfUser(clickedUser.id, date)
        .subscribe({
          next: (result : Workday)=> {
            console.log(result);
            if(result){
            workday = result;}
          },
          error:(err:any) => {
            console.log(err);
          },
          complete: () =>{
            console.log("complete");
            console.log(`${workday.date}`);
            this.workDays.push(workday);
          }
        })
    }
    
  }

  getCurrentWeek(date?: Date): Date[] {
    let chosenDate: Date = new Date();
    if (date) {
      chosenDate = date;
    }

    const week = [];
    for (let i = 1; i <= 7; i++) {
      const first = chosenDate.getDate() - chosenDate.getDay() + i;
      const day = new Date(chosenDate.setDate(first)); // .toISOString().slice(0, 10)

      week.push(this.formattedDate(day));
    }
    return week;
  }
  formattedDate(d: Date) {
    let month = String(d.getMonth() + 1);
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

  isAdmin(): boolean {
    return User.fromJSON(JSON.parse(localStorage.getItem("currentUser"))).admin;
  }
  get workdays$():Workday[]{
    return this.workDays;
  }
 /* testFun(): Workday{
    return this.workDays[1];
  }*/
}
