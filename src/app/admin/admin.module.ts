import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminActivitiesComponent} from './admin-activities/admin-activities.component';
import {ActivityListComponent} from './admin-activities/activity-list/activity-list.component';
import {ActivityNewComponent} from './admin-activities/activity-new/activity-new.component';
import {BusNewComponent} from './admin-busses/bus-new/bus-new.component';
import {BusComponent} from './admin-busses/bus/bus.component';
import {AdminBussesComponent} from './admin-busses/admin-busses.component';
import {BusListComponent} from './admin-busses/bus-list/bus-list.component';
import {AdminComponent} from './admin.component';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {ColorPickerModule} from 'ngx-color-picker';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ActivityComponent} from './admin-activities/activity/activity.component';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  declarations: [
    AdminActivitiesComponent,
    ActivityComponent,
    ActivityListComponent,
    ActivityNewComponent,
    AdminBussesComponent,
    BusComponent,
    BusListComponent,
    BusNewComponent,
    AdminComponent
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
    BusNewComponent
  ]
})
export class AdminModule { }
