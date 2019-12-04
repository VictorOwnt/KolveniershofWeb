import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../user/authentication.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import * as $ from 'jquery';
import {Bus} from '../../shared/models/bus.model';
import {BusDataService} from '../../services/bus.data.service';



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
      private busDataService: BusDataService) {}


  ngOnInit() {
    if (this.bus) {
      this.color = this.bus.color;
    }
    this.busForm = this.fb.group({
      name: [this.bus ? this.bus.name : '', Validators.required]
    });
  }



  getNameErrorMessage() {
    return (this.busForm.controls.name.hasError('required'))
        ? 'Naam is verplicht.' : '';
  }

  save() {
    if (this.bus) {
      this.bus.name = this.busForm.value.name;
      this.bus.color = this.color;
      console.log(this.bus);
      this.busDataService.patchBus(this.bus).subscribe(
          val => {
            if (val) {
              if (this.authService.redirectUrl) {
                this.router.navigateByUrl(this.authService.redirectUrl);
                this.authService.redirectUrl = undefined;
              } else {
                this.dialogRef.close();
              }
            } else {
              this.errorMsg = `Activiteit aanmaken mislukt`;
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            if (err.error instanceof Error) {
              this.errorMsg = `${err.error.message}`;
            } else {
              this.errorMsg = `${err.error}`;
            }
            $('#errorMsg').slideDown(200);
          }
      );
    } else {
      const bus = new Bus(this.busForm.value.name, this.color);
      this.busDataService.postBus(bus).subscribe(
          val => {
            if (val) {
              if (this.authService.redirectUrl) {
                this.router.navigateByUrl(this.authService.redirectUrl);
                this.authService.redirectUrl = undefined;
              } else {
                this.dialogRef.close();
              }
            } else {
              this.errorMsg = `Activiteit aanmaken mislukt`;
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            if (err.error instanceof Error) {
              this.errorMsg = `${err.error.message}`;
            } else {
              this.errorMsg = `${err.error}`;
            }
            $('#errorMsg').slideDown(200);
          }
      );
    }
  }
}
