import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WorkdayTemplateDataService} from '../../services/workdayTemplate.data.service';
import {Observable} from 'rxjs';
import {WorkdayDataService} from '../../services/workday.data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorModalComponent} from '../../shared/error-modal/error-modal.component';
import {MatDialog} from '@angular/material';
import {SuccessModalComponent} from '../../shared/success-modal/success-modal.component';

@Component({
  selector: 'app-schedule-empty',
  templateUrl: './schedule-empty.component.html',
  styleUrls: ['./schedule-empty.component.scss']
})
export class ScheduleEmptyComponent implements OnInit {
  @Input() dates: Date[];
  templateNames$: Observable<string[]>;
  public template: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private workdayTemplateDataService: WorkdayTemplateDataService,
    private workdayDataService: WorkdayDataService
  ) {
    // Load templateNames
    this.templateNames$ = workdayTemplateDataService.templateNames$;
  }

  ngOnInit() {
    this.template = this.fb.group({
      name: ['', Validators.required],
      week: ['', Validators.required]
    });
  }

  numberArray(n: number): number[] {
    return [...Array(n).keys()];
  }

  generateWeek(template: boolean = false) {
    if (template) {
      // Create week from template
      this.workdayTemplateDataService
        .createWeekFromTemplate(this.template.controls.name.value, this.template.controls.week.value, this.dates[0]).subscribe(val => {
          if (val) {
            // Open success modal
            this.openModal(true, 'Week aangemaakt vanuit template.');
          } else {
            // Error modal
            this.openModal(false, 'Aanmaken week vanuit template mislukt.');
          }
        },
        (err: HttpErrorResponse) => {
          // Open error dialog
          this.openModal(false, err.error instanceof Error ? err.error.message : err.error);
        });
    } else {
      // Create empty week
      this.workdayDataService
        .createEmptyWeek(this.dates[0]).subscribe(val => {
          if (val) {
            // Open success modal
            this.openModal(true, 'Week aangemaakt vanuit template.');
          } else {
            // Error modal
            this.openModal(false, 'Aanmaken week vanuit template mislukt.');
          }
        },
        (err: HttpErrorResponse) => {
          // Open error dialog
          this.openModal(false, err.error instanceof Error ? err.error.message : err.error);
        });
    }
  }

  openModal(isSuccess: boolean, message: string) {
    this.dialog.open(isSuccess ? SuccessModalComponent : ErrorModalComponent, {
      width: '300px',
      data: {message}
    });
  }

}
