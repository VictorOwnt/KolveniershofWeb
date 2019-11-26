import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WorkdayTemplateDataService} from '../../../services/workdayTemplate.data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-schedule-empty',
  templateUrl: './schedule-empty.component.html',
  styleUrls: ['./schedule-empty.component.scss']
})
export class ScheduleEmptyComponent implements OnInit {
  @Input() dates: Date[];
  templateNames$: Observable<string[]>;
  public template: FormGroup;

  constructor(private fb: FormBuilder, private workdayTemplateDataService: WorkdayTemplateDataService) {
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
      // TODO - create week from template
    } else {
      // TODO - create empty week
    }
  }

}
