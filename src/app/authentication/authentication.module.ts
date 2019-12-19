import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    EditProfileComponent
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
    MatDialogModule,
    MatSlideToggleModule,
    SharedModule
  ],
  entryComponents: [
    EditProfileComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    EditProfileComponent
  ]
})
export class AuthenticationModule {
}
