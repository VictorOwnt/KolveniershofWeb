import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../user/user.data.service";
import { User } from "../user/user.model";
import { Observable, Subject } from "rxjs";
import { WorkDayDataService } from "../workDay.data.service";
import { Workday } from "../domain/workday.model";
import { StaticMethodsPicto } from "../domain/staticMethods";

@Component({
  selector: "app-picto-agenda",
  templateUrl: "./picto-agenda.component.html",
  styleUrls: ["./picto-agenda.component.css"]
})
export class PictoAgendaComponent implements OnInit {
  public chosenDate: Date;

  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  private _users: User[];
  private workDays: any[] | Workday[];
  private _clickedUser: User;

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
    this._clickedUser = User.fromJSON(
      JSON.parse(localStorage.getItem("currentUser"))
    );

    if (index) {
      this._clickedUser = this._users[index];
    }
    let currentWeek = this.getCurrentWeek();

    if (this.chosenDate) {
      currentWeek = this.getCurrentWeek(this.chosenDate);
    }
    let workday: Workday;
    for (const date of currentWeek) {
      this._workdayDataService.getWorkDayByDate(date).subscribe({
        next: (result: Workday) => {
          if (result) {
            workday = result;
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.workDays.push(workday);
        }
      });
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
      const day = new Date(chosenDate.setDate(first)); 

      week.push(StaticMethodsPicto.formattedDate(day));
    }
    return week;
  }

  isAdmin(): boolean {
    return User.fromJSON(JSON.parse(localStorage.getItem("currentUser"))).admin;
  }

  get workdays$(): Workday[] {
    return this.workDays;
  }

  getWorkday(param: string | number) {
    this.sortByDate();
    return this.workDays[param];
  }

  // get monday$(): Workday {
  //   return this.workDays[0];
  // }
  // get tuesday$(): Workday {
  //   return this.workDays[1];
  // }

  get clickedUser(): User {
    return this._clickedUser;
  }

  private getTime(dateString: string | number | Date) {
    const date = new Date(dateString);

    return date != null ? date.getTime() : 0;
  }

  public sortByDate(): void {
    if (this.workDays.length > 1) {
      this.workDays.sort((day1: Workday, day2: Workday) => {
        return this.getTime(day1.date) - this.getTime(day2.date);
      });
    }
  }
}
