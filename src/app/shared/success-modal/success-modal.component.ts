import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {
  message: string = null;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.message = data.message;
  }

  ngOnInit() {
  }

}
