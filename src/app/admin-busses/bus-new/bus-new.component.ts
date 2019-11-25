import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Activity} from "../../shared/models/activity.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthenticationService} from "../../user/authentication.service";
import {Router} from "@angular/router";
import {ActivityDataService} from "../../services/activity.data.service";
import {HttpErrorResponse} from "@angular/common/http";
import * as $ from "jquery";
import {Bus} from "../../shared/models/bus.model";
import {BusDataService} from "../../services/bus.data.service";



@Component({
  selector: 'app-bus-new',
  templateUrl: './bus-new.component.html',
  styleUrls: ['./bus-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BusNewComponent implements OnInit {

  public color = '#000000';
  public bus: Bus = null;
  public busForm: FormGroup;
  public errorMsg = '';

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: Activity,
      public dialogRef: MatDialogRef<BusNewComponent>,
      private authService: AuthenticationService,
      private router: Router,
      private fb: FormBuilder,
      private _busDataService: BusDataService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if(this.data) {
      this.bus = Bus.fromJSON(this.data);
      this.color = this.bus.color;
    }
    this.busForm = this.fb.group({
      name: ['', Validators.required]
    });
  }



  getNameErrorMessage() {
    return (this.busForm.controls.name.hasError('required'))
        ? 'Naam is verplicht.' : '';
  }

  save(){
    if(this.bus) {
      this.bus.color = this.color;
      this._busDataService.patchBus(this.bus);
    }
    else{
      const bus = new Bus(this.busForm.value.name, this.color);
      this._busDataService.postBus(bus);
      console.log(bus);
    }
  }
}
