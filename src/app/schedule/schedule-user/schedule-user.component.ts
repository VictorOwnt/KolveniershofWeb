import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Workday} from '../../models/workday.model';
import {DatesService} from '../../services/dates.service';
import {WorkdayDataService} from '../../services/workday.data.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user.model';
import {UserDataService} from '../../services/user.data.service';

@Component({
  selector: 'app-schedule-user',
  templateUrl: './schedule-user.component.html',
  styleUrls: ['./schedule-user.component.scss']
})
export class ScheduleUserComponent implements OnInit {

  workdays$: Observable<Workday[]>;
  client: User = null;
  dates: Date[] = [];
  private date: Date = new Date();
  loggedInAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    public datesService: DatesService,
    private workdayDataService: WorkdayDataService,
    private auth: AuthenticationService,
    private userDataService: UserDataService
  ) {
  }

  ngOnInit() {
    // Get logged in user
    this.loggedInAdmin = this.auth.currentUser.admin;
    // Get user
    this.getUser(this.route.snapshot.paramMap.get('clientId')).then(() => {
      // Load workdays
      this.loadWorkdays(this.date);
    });
  }

  private async getUser(id?: string) {
    if (id) {
      this.client = await this.userDataService.getUserById(this.route.snapshot.paramMap.get('clientId')).toPromise();
    } else {
      this.client = this.auth.currentUser;
    }
  }

  // Load all workdays based on day in week
  private loadWorkdays(date: Date) {
    // Get all days in week for today's week
    this.dates = this.datesService.weekDays(date);
    // Get all workdays for this week
    this.workdays$ = this.workdayDataService.getWorkdaysByWeekByUser(this.dates[0], this.client);
  }

  // Load next week
  nextWeek() {
    this.date = this.datesService.addWeek(this.date);
    this.loadWorkdays(this.date);
  }

  // Load previous week
  prevWeek() {
    this.date = this.datesService.subtractWeek(this.date);
    this.loadWorkdays(this.date);
  }

}
