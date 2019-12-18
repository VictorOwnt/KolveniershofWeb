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

@NgModule({
  declarations: [
    AdminActivitiesComponent,
    ActivityNewComponent,
    AdminBussesComponent,
    BusNewComponent,
    AdminComponent,
    AdminTemplatesComponent,
    TemplateNewComponent
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
    MatInputModule
  ],
  entryComponents: [
    ActivityNewComponent,
    BusNewComponent,
    TemplateNewComponent
  ]
})
export class AdminModule {
}
