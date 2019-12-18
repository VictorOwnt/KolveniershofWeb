import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  public user: FormGroup;
  public errorMsg = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // TODO - Validators.pattern()
      password: ['', [Validators.required]]
    });
  }

  getEmailErrorMessage() {
    return this.user.controls.email.hasError('required') ? 'Emailadres is verplicht.' :
      this.user.controls.email.hasError('email') ? 'Geen geldig emailadres.' :
        '';
  }

  getPasswordErrorMessage() {
    return this.user.controls.password.hasError('required') ? 'Wachtwoord is verplicht.' : '';
  }

  login() {
    this.authService
      .login(this.user.value.email, this.user.value.password)
      .subscribe(
        val => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.errorMsg = `Aanmelden mislukt`;
          }
        },
        (err: HttpErrorResponse) => {
          console.error(err);
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
