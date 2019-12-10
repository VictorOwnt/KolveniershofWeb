import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    FlexModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent
  ]
})
export class AuthenticationModule {}
