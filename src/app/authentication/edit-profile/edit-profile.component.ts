import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivityDataService} from '../../services/activity.data.service';
import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../authentication.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

function serverSideValidateEmail(authService: AuthenticationService, oldValue: string): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return authService.checkEmailAvailability(control.value, oldValue).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return {userAlreadyExists: true};
      })
    );
  };
}

function emailPatternValid(pattern: string): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value && !control.value.match(pattern)) {
      return {emailInvalid: true};
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  imageUrl: any = null;
  isNewImage = false;
  isAdmin: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private activityDataService: ActivityDataService,
    private firebaseService: FirebaseService,
    private auth: AuthenticationService
  ) {
    this.user = data.user;
    this.isAdmin = auth.currentUser.admin;
  }

  ngOnInit() {
    const oldEmail = this.user.email;
    this.userForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required,
        emailPatternValid('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        serverSideValidateEmail(this.auth, oldEmail) // TODO - async
      ],
      birthday: [this.user.birthday, Validators.required],
      street: [this.user.street],
      city: [this.user.city],
      postalCode: [this.user.postalCode],
      picture: [this.user.picture]
    });
  }

  getNameErrorMessage() {
    return (this.userForm.controls.firstName.hasError('required') || this.userForm.controls.lastName.hasError('required'))
      ? 'Volledige naam is verplicht.' : '';
  }

  getEmailErrorMessage() {
    return this.userForm.controls.email.hasError('required') ? 'Emailadres is verplicht.' :
      this.userForm.controls.email.hasError('emailInvalid') ? 'Geen geldig emailadres.' :
        this.userForm.controls.email.hasError('userAlreadyExists') ? 'Er bestaat al een gebruiker met dit emailadres.' :
          '';
  }

  getBirthdayErrorMessage() {
    return this.userForm.controls.birthday.hasError('required') ? 'Geboortedatum is verplicht.' : '';
  }

  preview(fileInput: any) {
    const fileData = this.firebaseService.handleFile(fileInput);
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
      this.isNewImage = true;
    };
  }

  save() {
    // TODO
  }

}
