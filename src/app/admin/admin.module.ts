import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminActivitiesComponent} from './admin-activities/admin-activities.component';
import {ActivityNewComponent} from './admin-activities/activity-new/activity-new.component';
import {BusNewComponent} from './admin-busses/bus-new/bus-new.component';
import {AdminBussesComponent} from './admin-busses/admin-busses.component';
import {AdminComponent} from './admin.component';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {ColorPickerModule} from 'ngx-color-picker';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminTemplatesComponent} from './admin-templates/admin-templates.component';
import {TemplateNewComponent} from './admin-templates/template-new/template-new.component';
import {ActivityComponent} from './admin-activities/activity/activity.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {UserNewComponent} from './admin-users/user-new/user-new.component';
import {UserComponent} from './admin-users/user/user.component';
import {AuthenticationModule} from '../authentication/authentication.module';
import {ImgFallbackModule} from 'ngx-img-fallback';

@NgModule({
  declarations: [
    AdminActivitiesComponent,
    ActivityNewComponent,
    AdminBussesComponent,
    BusNewComponent,
    AdminComponent,
    AdminTemplatesComponent,
    TemplateNewComponent,
    ActivityComponent,
    AdminUsersComponent,
    UserNewComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FlexModule,
    MatCardModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    ColorPickerModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    AuthenticationModule,
    ImgFallbackModule
  ],
  entryComponents: [
    ActivityNewComponent,
    BusNewComponent,
    TemplateNewComponent,
    UserNewComponent
  ]
})
export class AdminModule {
}
