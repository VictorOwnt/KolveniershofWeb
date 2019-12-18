import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Workday} from '../../models/workday.model';
import {WorkdayDataService} from '../../services/workday.data.service';
import {FirebaseService} from 'src/app/services/firebase.service';
import {Observable} from 'rxjs';
import {WorkdayTemplate} from '../../models/workdayTemplate.model';
import {WorkdayTemplateDataService} from '../../services/workdayTemplate.data.service';
import {MatDialog} from '@angular/material/dialog';
import {SuccessModalComponent} from '../../shared/success-modal/success-modal.component';
import {EditUnitModalComponent} from '../schedule-unit/edit-unit-modal/edit-unit-modal.component';
import {CommentListComponent} from '../comment-list/comment-list.component';
import {WarningModalComponent} from '../../shared/warning-modal/warning-modal.component';
import {ErrorModalComponent} from '../../shared/error-modal/error-modal.component';

@Component({
  selector: 'app-schedule-weekday',
  templateUrl: './schedule-weekday.component.html',
  styleUrls: ['./schedule-weekday.component.scss']
})
export class ScheduleWeekdayComponent implements OnInit {
  @ViewChild('notes', {static: false}) notesInput;
  @ViewChild('dayActivitiesToggle', {static: false}) dayActivitiesToggle;
  @Input() workday: Workday | WorkdayTemplate;
  @Input() isAdmin: boolean;
  isTemplate: boolean;
  hasDayActivities: boolean;
  icon: Observable<string | null>;

  constructor(
    public dialog: MatDialog,
    private workdayDataService: WorkdayDataService,
    private workdayTemplateDataService: WorkdayTemplateDataService,
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit() {
    this.hasDayActivities = this.workday.dayActivities.length !== 0;
    if (this.workday instanceof Workday) {
      this.isTemplate = false;
      this.icon = this.firebaseService
        .lookupFileDownloadUrl(this.workdayDataService.getDayIcon(this.workday.date.getDay()), 'icon');
    } else if (this.workday instanceof WorkdayTemplate) {
      this.isTemplate = true;
      this.icon = this.firebaseService
        .lookupFileDownloadUrl(this.workdayTemplateDataService.getDayIcon(this.workday.dayNumber), 'icon');
    }
  }

  addNotes(notes: string) {
    (this.workday as Workday).notes = notes;
    this.workdayDataService.patchWorkday(this.workday as Workday).subscribe(value => {
      if (value.notes === (this.workday as Workday).notes) {
        // Success modal
        this.dialog.open(SuccessModalComponent, {
          width: '300px',
          data: {message: 'Nota\'s succesvol opgeslagen.'}
        });
      } else {
        // Error modal
        this.dialog.open(ErrorModalComponent, {
          width: '300px',
          data: {message: 'Opslaan nota\'s mislukt.'}
        });
      }
    });
  }

  newUnit(type: string, isAm: boolean = null, isDay: boolean = null) {
    let dialogData;
    if (this.isTemplate) {
      dialogData = {
        workdayTemplate: this.workday as WorkdayTemplate,
        isActivity: (type === 'activity'),
        isAm,
        isDay
      };
    } else {
      dialogData = {
        workdayTemplate: this.workday as WorkdayTemplate,
        isActivity: (type === 'activity'),
        isAm,
        isDay
      };
    }
    this.dialog.open(EditUnitModalComponent, {
      width: '1000px',
      data: dialogData
    }).afterClosed().subscribe(message => {
      if (message) {
        this.dialog.open(SuccessModalComponent, {
          width: '300px',
          data: {message}
        });
      }
    });
  }

  changeHoliday(holiday: boolean) {
    this.workday.holiday = holiday;
    if (this.isTemplate) {
      this.workdayTemplateDataService.patchWorkdayTemplate(this.workday as WorkdayTemplate);
    } else {
      this.workdayDataService.patchWorkday(this.workday as Workday);
    }
  }

  changeDayActivities(hasDayActivities: boolean) {
    this.dialog.open(WarningModalComponent, {
      width: '500px',
      data: {message: this.hasDayActivities ? 'Hiermee verwijder je het bestaande dagatelier.' : 'Hiermee verwijder je alle bestaande ateliers en de lunch.'}
    }).afterClosed().subscribe(result => {
      if (result) {
        // Delete data in activity
        if (this.hasDayActivities) {
          this.workday.dayActivities = [];
        } else {
          this.workday.lunch = null;
          this.workday.amActivities = [];
          this.workday.pmActivities = [];
        }
        if (this.isTemplate) {
          this.workdayTemplateDataService.patchWorkdayTemplate(this.workday as WorkdayTemplate).subscribe(value => {
            if (value) {
              // Set hasDayActivities to slider value
              this.hasDayActivities = hasDayActivities;
            } else {
              this.dayActivitiesToggle.checked = !hasDayActivities;
              // Open error dialog
              this.dialog.open(ErrorModalComponent, {
                width: '300px',
                data: {message: 'Het is niet gelukt om de dag aan te passen.'}
              });
              // Reload workday template data
              this.workdayTemplateDataService.getWorkdayTemplateById(this.workday.id).subscribe(template => this.workday = template);
            }
          });
        } else {
          this.workdayDataService.patchWorkday(this.workday as Workday).subscribe(value => {
            if (value) {
              // Set hasDayActivities to slider value
              this.hasDayActivities = hasDayActivities;
            } else {
              this.dayActivitiesToggle.checked = !hasDayActivities;
              // Open error dialog
              this.dialog.open(ErrorModalComponent, {
                width: '300px',
                data: {message: 'Het is niet gelukt om de dag aan te passen.'}
              });
              // Reload workday data
              this.workdayDataService.getWorkdayById(this.workday.id).subscribe(workday => this.workday = workday);
            }
          });
        }
      } else {
        this.dayActivitiesToggle.checked = !hasDayActivities;
      }
    });
  }

  viewComments(comments: Comment[]) {
    this.dialog.open(CommentListComponent, {
      width: '800px',
      data: {comments}
    });
  }
}
