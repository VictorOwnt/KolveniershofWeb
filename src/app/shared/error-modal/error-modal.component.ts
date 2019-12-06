import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  message: string = null;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.message = data.message;
  }

  ngOnInit() {}

}
