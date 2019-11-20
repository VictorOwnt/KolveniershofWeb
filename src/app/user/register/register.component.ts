import { AuthenticationService } from '../authentication.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as zxcvbn from 'zxcvbn';
import * as $ from 'jquery';

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

function serverSideValidateEmail(authService: AuthenticationService): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return authService.checkEmailAvailability(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}

function passwordStrength(control: AbstractControl) { // TODO
  if (zxcvbn(control.value).score < 2) {
    return { passwordStrenght: true };
  } else {
    return null;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMsg = '';
  public startDate = new Date();
  hidePassword = true;
  hideConfirmPassword = true;
  imageUrl: any = null;
  fileData: File = null;
  uploadedFilePath: string = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email], // TODO - Validators.pattern()
        serverSideValidateEmail(this.authService)
      ],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, passwordStrength]],
          confirmPassword: ['', Validators.required]
        },
        { validators: [Validators.required, comparePasswords] }
      ),
      street: [''],
      city: [''],
      postalCode: [''],
      birthday: ['', Validators.required]
    });
  }

  getNameErrorMessage() {
    return (this.user.controls.firstName.hasError('required') || this.user.controls.lastName.hasError('required'))
      ? 'Volledige naam is verplicht.' : '';
  }

  getEmailErrorMessage() {
    return this.user.controls.email.hasError('required') ? 'Emailadres is verplicht.' :
      this.user.controls.email.hasError('email') ? 'Geen geldig emailadres.' :
        this.user.controls.email.hasError('userAlreadyExists') ? 'Er bestaat al een gebruiker met dit emailadres.' :
        '';
  }

  getPasswordErrorMessage() {
    return this.user.controls.passwordGroup.hasError('required')
      ? 'Wachtwoord is verplicht' :
      this.user.controls.passwordGroup.get('password').hasError('passwordStrength')
        ? 'Wachtwoord is niet sterk genoeg.' :
          this.user.controls.passwordGroup.hasError('passwordsDiffer')
            ? 'Wachtwoorden komen niet overeen.' : '';
  }

  getBirthdayErrorMessage() {
    return this.user.controls.birthday.hasError('required') ? 'Geboortedatum is verplicht.' : '';
  }

  preview(fileInput: any) {
    this.fileData = (fileInput.target.files[0] as File);

    const fileType = this.fileData.type;
    if (fileType.match(/image\/*/) == null) {
      console.log('no image');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
}

  register() {
    this.authService
      .register(
        this.user.value.email,
        this.user.value.passwordGroup.password,
        this.user.value.firstName,
        this.user.value.lastName,
        this.user.value.picture, // TODO - Picture
        this.user.value.birthday, // TODO - Correct date
        this.user.value.street,
        this.user.value.city,
        this.user.value.postalCode
      )
      .subscribe(
        val => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/user-list']); // TODO
            }
          } else {
            this.errorMsg = `Registreren mislukt`;
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
