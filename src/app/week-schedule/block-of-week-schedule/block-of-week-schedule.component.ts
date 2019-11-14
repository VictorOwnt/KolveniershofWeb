import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/user.model';
import { Workday } from 'src/app/domain/workday.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { EditWeekScheduleComponent } from 'src/app/edit-week-schedule/edit-week-schedule.component';
import { UserDataService } from 'src/app/services/user.data.service';

@Component({
  selector: 'app-block-of-week-schedule',
  templateUrl: './block-of-week-schedule.component.html',
  styleUrls: ['./block-of-week-schedule.component.scss']
})
export class BlockOfWeekScheduleComponent implements OnInit {
  private _fetchUsers$: Observable<User[]> = this._userDataService.users$;
  private _users: User[];
  private userAbsents: User[];

  @Input() public workday: Workday;
  @Input() public planningDate: Date;
  @Input() public name: string;
  private _variable: any;
  private dayNr = new Date().getDay();
  editWeekSchedule: MatDialogRef<EditWeekScheduleComponent>;

  constructor(
    private dialog: MatDialog,
    private _userDataService: UserDataService
  ) {
    this._fetchUsers$.subscribe(users => (this._users = users));
  }
  ngOnInit() {}

  openEditWeekSchedule() {
    this.editWeekSchedule = this.dialog.open(EditWeekScheduleComponent, {
      data: {
        workday: this.workday,
        changeType: this.name,
        planningDate: this.planningDate
      }
    });
  }

  get variable() {
    return this._variable;
  }

  setVariable() {
    switch (this.name) {
      case 'Algemeen':
        break;
      case 'Voormiddag':
        break;
      case 'Extra':
        break;
      case 'Namiddag':
        break;
    }
  }

  get users$(): User[] {
    return this._users;
  }

  get userAbsents$(): User[] {
    this.users$.forEach(user => {
      if (user.absentDates.length !== 0) {
        user.absentDates.forEach(absentDate => {
          if (absentDate === this.planningDate) {
            this.userAbsents.push(user);
          }
        });
      }
    });
    return this.userAbsents;
  }
  get food(): string {
    if (this.workday.lunch !== undefined) {
      return this.workday.lunch.lunch;
    }
    return '';
  }
}
