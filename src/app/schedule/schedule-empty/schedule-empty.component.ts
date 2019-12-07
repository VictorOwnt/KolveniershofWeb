import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WorkdayTemplateDataService} from '../../services/workdayTemplate.data.service';
import {Observable} from 'rxjs';
import {WorkdayDataService} from '../../services/workday.data.service';

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
      this.workdayTemplateDataService.createWeek(this.template.controls.name.value, this.template.controls.week.value, this.dates[0]);
    } else {
      // Create empty week
      this.workdayDataService.createEmptyWeek(this.dates[0]);
    }
  }

}
