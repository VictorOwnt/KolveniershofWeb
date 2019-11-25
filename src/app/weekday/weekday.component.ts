import { Component, OnInit, Input } from '@angular/core';
import { Workday } from 'src/app/shared/models/workday.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weekday',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.scss']
})
export class WeekdayComponent implements OnInit {
  @Input() public weekDay: Workday;

  public commentFormControl = new FormControl('', []);

  constructor() {}

  ngOnInit() {
  }
}
