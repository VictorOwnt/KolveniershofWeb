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
import {AdminBussesComponent} from "../admin-busses.component";



@Component({
  selector: 'app-bus-new',
  templateUrl: './bus-new.component.html',
  styleUrls: ['./bus-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BusNewComponent implements OnInit {

  public color = '#000000';
  public busForm: FormGroup;
  public errorMsg = '';

  constructor(
      @Inject(MAT_DIALOG_DATA) public bus: Bus,
      public dialogRef: MatDialogRef<BusNewComponent>,
      private authService: AuthenticationService,
      private router: Router,
      private fb: FormBuilder,
      private _busDataService: BusDataService) {}


  ngOnInit() {
    if(this.bus) {
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
      console.log(this.bus);
      this._busDataService.patchBus(this.bus).subscribe();
    }
    else{
      const bus = new Bus(this.busForm.value.name, this.color);
      this._busDataService.postBus(bus).subscribe();
      console.log(bus);
    }
  }
}
