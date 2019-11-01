import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../user/user.data.service";
import { User } from "../user/user.model";
import { Observable, Subject } from "rxjs";
import { WorkDayDataService } from "../workDay.data.service";
import { Workday } from "../domain/workday.model";
import { Activity } from "../domain/activity.model";
import { ActivityUnit } from "../domain/activityUnit.model";
import { LunchUnit } from "../domain/lunchUnit.model";
import { BusUnit } from "../domain/busUnit.model";
import { Bus } from "../domain/bus.model";

@Component({
  selector: "app-picto-agenda",
  templateUrl: "./picto-agenda.component.html",
  styleUrls: ["./picto-agenda.component.css"]
})
export class PictoAgendaComponent implements OnInit {
  public val: Date; 
  
  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  private _users: User[];
  private workDays;
  private _clickedUser:User;

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

    
    if (this.val) {
      currentWeek = this.getCurrentWeek(this.val);
    }
    let workday: Workday;
    for (const date of currentWeek) {
      this._workdayDataService.getWeekOfUser(this._clickedUser.id, date).subscribe({
        next: (result: Workday) => {
          //console.log(result);
          if (result) {
            workday = result;
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
         // console.log("complete");
         // console.log(`${workday.date}`);
          this.workDays.push(workday);
        }
      });
    }
    

    // this.workDays = this.workDays.filter(elem => elem !== undefined);

    // if (this.workDays === undefined || this.workDays.length === 0) {
    //   const amW: ActivityUnit[] = [
    //     new ActivityUnit(new Activity("voetballen", "icon-soccer-player.svg")),
    //     new ActivityUnit(new Activity("praten", "icon-talk.svg"))
    //   ];
    //   const pmW: ActivityUnit[] = [
    //     new ActivityUnit(new Activity("paardrijden", "icon-horse.svg")),
    //     new ActivityUnit(new Activity("koken", "icon-frying-pan.svg"))
    //   ];
    //   const men = [];
    //   const lun: LunchUnit = new LunchUnit();
    //   const amB: BusUnit[] = [
    //     new BusUnit(new Bus("Gent", "rood", "busBlack.png")),
    //     new BusUnit(new Bus("Leuven", "roze", "busBlack.png"))
    //   ];
    //   const pmB: BusUnit[] = [
    //     new BusUnit(new Bus("Gent", "rood", "busBlack.png")),
    //     new BusUnit(new Bus("Leuven", "roze", "busBlack.png"))
    //   ];

    //   const hol = false;
    //   const temp2 = this.val;
    //   let workdayy;
    //   const currentweek = this.getCurrentWeek(temp2);
    //   for (const dater of currentweek) {
    //     workdayy = new Workday(dater, amW, pmW, men, lun, amB, pmB, hol);
    //     this.workDays.push(workdayy);
    //   }
    //   this.workDays = this.workDays.sort(w => w.date);
    // }
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
  get workdays$(): Workday[] {
    return this.workDays;
  }
  

  getWorkday(param) {
    //this.sortByDate(); 
    return this.workDays[param];
  }

  get monday$(): Workday{
    return this.workDays[0];
  }
  get tuesday$(): Workday{
    return this.workDays[1];
  }
  get clickedUser$():User{
    return this._clickedUser;
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
}


public sortByDate(): void {
    this.workDays.sort((day1:Workday, day2:Workday) => {
        return this.getTime(day1.date) - this.getTime(day2.date);
    });
}

}