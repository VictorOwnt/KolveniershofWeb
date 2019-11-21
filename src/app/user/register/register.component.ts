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

function comparePasswords(control: AbstractControl) {
  return new Promise( resolve => {
    const password = control.parent.controls['password'].value;
    const confirmPassword = control.value;
    return password === confirmPassword
      ? resolve(null)
      : resolve({ passwordsDiffer: true });
  });
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

function emailPatternValid(pattern: string): ValidatorFn {
  return (control: AbstractControl) => {
    const urlRegEx: string = pattern;
    if (control.value && !control.value.match(urlRegEx)) {
      return { emailInvalid: true};
    } else {
      return null;
    }
  };
}

function passwordStrength(control: AbstractControl): { [key: string]: any }  {
  if (zxcvbn(String(control.value)).score < 2) {
    return { passwordStrenghtValue: true };
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
  public url: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,
        emailPatternValid('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        serverSideValidateEmail(this.authService) // TODO - async
      ],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, passwordStrength]],
          confirmPassword: ['', Validators.required, comparePasswords]
        }
      ),
      birthday: ['', Validators.required],
      street: [''],
      city: [''],
      postalCode: [''],
      picture: ['']
    });
  }

  getNameErrorMessage() {
    return (this.user.controls.firstName.hasError('required') || this.user.controls.lastName.hasError('required'))
      ? 'Volledige naam is verplicht.' : '';
  }

  getEmailErrorMessage() {
    return this.user.controls.email.hasError('required') ? 'Emailadres is verplicht.' :
      this.user.controls.email.hasError('emailInvalid') ? 'Geen geldig emailadres.' :
        this.user.controls.email.hasError('userAlreadyExists') ? 'Er bestaat al een gebruiker met dit emailadres.' :
        '';
  }

  getPasswordErrorMessage() {
    return this.user.controls.passwordGroup.hasError('required', 'password')
      ? 'Wachtwoord is verplicht' :
        this.user.controls.passwordGroup.hasError('passwordStrenghtValue', 'password')
          ? 'Wachtwoord is niet sterk genoeg.' :
            this.user.controls.passwordGroup.hasError('passwordsDiffer', 'confirmPassword')
              ? 'Wachtwoorden komen niet overeen.' : '';
  }

  getBirthdayErrorMessage() {
    return this.user.controls.birthday.hasError('required') ? 'Geboortedatum is verplicht.' : '';
  }

  register() {
    this.authService
      .register(
        this.user.value.email,
        this.user.value.passwordGroup.password,
        this.user.value.firstName,
        this.user.value.lastName,
        //this.user.value.picture, // TODO - Picture
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
