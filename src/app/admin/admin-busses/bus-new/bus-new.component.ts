import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Bus} from '../../../models/bus.model';
import {BusDataService} from '../../../services/bus.data.service';
import {ErrorModalComponent} from '../../../shared/error-modal/error-modal.component';


@Component({
  selector: 'app-bus-new',
  templateUrl: './bus-new.component.html',
  styleUrls: ['./bus-new.component.scss']
})
export class BusNewComponent implements OnInit {
  bus: Bus;
  public color = '#000000';
  public busForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<BusNewComponent>,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private busDataService: BusDataService
  ) {
    this.bus = data.bus;
  }


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
      this.busDataService.patchBus(this.bus).subscribe(
        val => {
          if (val) {
            // Success modal
            this.dialogRef.close('Bus aangepast.');
          } else {
            // Error modal
            this.dialogRef.close(false);
          }
        },
        (err: HttpErrorResponse) => {
          // Open error dialog
          this.dialog.open(ErrorModalComponent, {
            width: '300px',
            data: {message: err.error instanceof Error ? err.error.message : err.error}
          });
        }
      );
    } else {
      const bus = new Bus(this.busForm.value.name, this.color);
      this.busDataService.postBus(bus).subscribe(
        val => {
          if (val) {
            // Success modal
            this.dialogRef.close('Bus aangemaakt.');
          } else {
            // Error modal
            this.dialogRef.close(false);
          }
        },
        (err: HttpErrorResponse) => {
          // Open error dialog
          this.dialog.open(ErrorModalComponent, {
            width: '300px',
            data: {message: err.error instanceof Error ? err.error.message : err.error}
          });
        }
      );
    }
  }
}
