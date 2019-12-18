import {AuthenticationService} from '../authentication.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as zxcvbn from 'zxcvbn';
import * as $ from 'jquery';
import {FirebaseService} from '../../services/firebase.service';

function comparePasswords(control: AbstractControl) {
  return new Promise(resolve => {
    // tslint:disable-next-line: no-string-literal
    const password = control.parent.controls['password'].value;
    const confirmPassword = control.value;
    return password === confirmPassword
      ? resolve(null)
      : resolve({passwordsDiffer: true});
  });
}

function serverSideValidateEmail(authService: AuthenticationService): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return authService.checkEmailAvailability(control.value).pipe(
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

function passwordStrength(control: AbstractControl): { [key: string]: any } {
  if (zxcvbn(String(control.value)).score < 2) {
    return {passwordStrenghtValue: true};
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
  public isNew = false;
  hidePassword = true;
  hideConfirmPassword = true;
  imageUrl: any = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
  }

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

  preview(fileInput: any) {
    const fileData = this.firebaseService.handleFile(fileInput);
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
      this.isNew = true;
    };
  }


  register() {
    let filePath = '';
    if (this.isNew) {
      filePath = 'users/' + this.user.value.firstName + '_' + this.user.value.lastName + '_' + new Date().toISOString().split('T')[0];
      this.firebaseService.uploadFile(filePath);
    }
    this.authService.register(
      this.user.value.email,
      this.user.value.passwordGroup.password,
      this.user.value.firstName,
      this.user.value.lastName,
      filePath,
      this.user.value.birthday,
      this.user.value.street,
      this.user.value.city,
      this.user.value.postalCode
    ).subscribe(val => {
        if (val) {
          if (this.authService.redirectUrl) {
            this.router.navigateByUrl(this.authService.redirectUrl);
            this.authService.redirectUrl = undefined;
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.errorMsg = `Registreren mislukt`;
        }
      }, (err: HttpErrorResponse) => {
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
