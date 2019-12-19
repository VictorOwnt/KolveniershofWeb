import {Component, OnInit} from '@angular/core';
import {WorkdayTemplateDataService} from '../../services/workdayTemplate.data.service';
import {Observable} from 'rxjs';
import {WorkdayTemplate} from '../../models/workdayTemplate.model';
import {ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessModalComponent } from 'src/app/shared/success-modal/success-modal.component';
import { ErrorModalComponent } from 'src/app/shared/error-modal/error-modal.component';

@Component({
  selector: 'app-schedule-template',
  templateUrl: './schedule-template.component.html',
  styleUrls: ['./schedule-template.component.scss']
})
export class ScheduleTemplateComponent implements OnInit {
  templateName: string;
  weekNumber = 1;
  workdayTemplates$: Observable<WorkdayTemplate[]>;

  constructor(private route: ActivatedRoute, private workdayTemplateDataService: WorkdayTemplateDataService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.templateName = this.route.snapshot.paramMap.get('templateName');
    this.loadWorkdayTemplates(this.templateName, this.weekNumber);
  }

  // Load all workdayTemplates based on templateName and weekNumber
  loadWorkdayTemplates(templateName: string, weekNumber: number) {
    this.workdayTemplates$ = this.workdayTemplateDataService.getWorkdayTemplatesByName(templateName, weekNumber);
  }

  // Load next week
  nextWeek() {
    this.weekNumber += 1;
    this.loadWorkdayTemplates(this.templateName, this.weekNumber);
  }

  // Load previous week
  prevWeek() {
    this.weekNumber -= 1;
    this.loadWorkdayTemplates(this.templateName, this.weekNumber);
  }

  deleteWeek() {
    // TODO - week, verwijdert nu alle weken van die templates
    this.workdayTemplateDataService.deleteWorkdayTemplates(this.templateName).subscribe(value => {
      if (value) {
        // Success dialog
        this.dialog.open(SuccessModalComponent, {
          width: '300px',
          data: {message: 'Template succesvol verwijderd!'}
        });
      } else {
        // Error dialog
        this.dialog.open(ErrorModalComponent, {
          width: '300px',
          data: {message: 'Template verwijderen mislukt!'}
        });
      }
    });
  }

}
