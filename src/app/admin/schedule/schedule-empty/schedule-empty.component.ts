import {Component, Input, OnInit} from '@angular/core';
import {WorkdayDataService} from '../../../services/workday.data.service';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-schedule-empty',
  templateUrl: './schedule-empty.component.html',
  styleUrls: ['./schedule-empty.component.scss']
})
export class ScheduleEmptyComponent implements OnInit {
  @Input() dates: Date[];
  templateNames$: string[] = []; // TODO - Observable<string[]>;
  public template: FormGroup;

  constructor(
    private fb: FormBuilder/*,
    private workdayTemplateDataService: WorkdayTemplateDataService*/) {
    // TODO - load templateNames
  }

  ngOnInit() {
    this.template = this.fb.group({
      name: ['', Validators.required],
      week: ['', Validators.required]
    });
  }

  generateWeek(template: boolean = false) {
    if (template) {
      // TODO - create week from template
    } else {
      // TODO - create empty week
    }
  }

}
