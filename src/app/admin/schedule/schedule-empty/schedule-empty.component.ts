import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WorkdayTemplateDataService} from '../../../services/workdayTemplate.data.service';

@Component({
  selector: 'app-schedule-empty',
  templateUrl: './schedule-empty.component.html',
  styleUrls: ['./schedule-empty.component.scss']
})
export class ScheduleEmptyComponent implements OnInit {
  @Input() dates: Date[];
  templateNames$: string[] = []; // TODO - Observable<string[]>;
  public template: FormGroup;

    // TODO - load templateNames
  constructor(private fb: FormBuilder, private workdayTemplateDataService: WorkdayTemplateDataService) {
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
