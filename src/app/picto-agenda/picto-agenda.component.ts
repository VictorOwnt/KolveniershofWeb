import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Observable, Subject } from 'rxjs';
import { Workday } from '../shared/models/workday.model';
import { UserDataService } from '../services/user.data.service';
import { WorkdayDataService } from '../services/workday.data.service';
import {DatesService} from '../services/dates.service';

@Component({
  selector: 'app-picto-agenda',
  templateUrl: './picto-agenda.component.html',
  styleUrls: ['./picto-agenda.component.scss']
})
export class PictoAgendaComponent implements OnInit {
  public chosenDate: Date;

  private fetchUsers$: Observable<User[]> = this.userDataService.users$;
  private users: User[];
  private workDays: any[] | Workday[];
  private clickedUser: User;

  constructor(
    private datesService: DatesService,
    private userDataService: UserDataService,
    private workdayDataService: WorkdayDataService
  ) {
    this.fetchUsers$.subscribe(users => (this.users = users));
    this.showPictoOfUser();
  }

  ngOnInit() { }

  get users$(): Observable<User[]> {
    return this.fetchUsers$;
  }

  showPictoOfUser(index?: number): void {
    this.workDays = [];
    this.clickedUser = User.fromJSON(
      JSON.parse(localStorage.getItem('currentUser'))
    );

    if (index) {
      this.clickedUser = this.users[index];
    }
    let currentWeek = this.datesService.weekDays(new Date());

    if (this.chosenDate) {
      currentWeek = this.datesService.weekDays(this.chosenDate);
    }
    let workday: Workday;
    for (const date of currentWeek) {
      this.workdayDataService.getWorkdayByDate(date).subscribe({
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

  isAdmin(): boolean {
    return User.fromJSON(JSON.parse(localStorage.getItem('currentUser'))).admin;
  }

  get workdays$(): Workday[] {
    return this.workDays;
  }

  getWorkday(param: string | number) {
    this.sortByDate();
    return this.workDays[param];
  }

  getWeekdays(): Workday[] {
    const weekdays = [];
    for (let i = 0; i < 5; i++) {

      console.log(this.workDays);

      weekdays.push(this.workDays[i]);
    }
    return weekdays;
  }

  getWeekenddays(): Workday[] {
    const weekenddays = [];
    for (let i = 5; i < 7; i++) {

      console.log('test');
      weekenddays.push(this.workDays[i]);
    }
    return weekenddays;
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
