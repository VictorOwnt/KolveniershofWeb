import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentListComponent} from './comment-list/comment-list.component';
import {ScheduleEmptyComponent} from './schedule-empty/schedule-empty.component';
import {ScheduleUnitComponent} from './schedule-unit/schedule-unit.component';
import {ScheduleWeekdayComponent} from './schedule-weekday/schedule-weekday.component';
import {ScheduleWeekendComponent} from './schedule-weekend/schedule-weekend.component';
import {ScheduleComponent} from './schedule.component';
import {EditUnitModalComponent} from './schedule-unit/edit-unit-modal/edit-unit-modal.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule, MatSlideToggleModule
} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {ImgFallbackModule} from 'ngx-img-fallback';
import {SharedModule} from '../shared/shared.module';
import {ScheduleRoutingModule} from './schedule-routing.module';

@NgModule({
  declarations: [
    CommentListComponent,
    ScheduleEmptyComponent,
    ScheduleUnitComponent,
    EditUnitModalComponent,
    ScheduleWeekdayComponent,
    ScheduleWeekendComponent,
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatDialogModule,
    FlexModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    ImgFallbackModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    SharedModule
  ],
  entryComponents: [
    EditUnitModalComponent,
    CommentListComponent
  ]
})
export class ScheduleModule { }
