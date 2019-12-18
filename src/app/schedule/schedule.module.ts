import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentListComponent} from './comment-list/comment-list.component';
import {CommentNewComponent} from './comment-new/comment-new.component';
import {ScheduleEmptyComponent} from './schedule-empty/schedule-empty.component';
import {ScheduleUnitComponent} from './schedule-unit/schedule-unit.component';
import {ScheduleWeekdayComponent} from './schedule-weekday/schedule-weekday.component';
import {ScheduleWeekendComponent} from './schedule-weekend/schedule-weekend.component';
import {ScheduleAdminComponent} from './schedule-admin/schedule-admin.component';
import {EditUnitModalComponent} from './schedule-unit/edit-unit-modal/edit-unit-modal.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImgFallbackModule} from 'ngx-img-fallback';
import {SharedModule} from '../shared/shared.module';
import {ScheduleRoutingModule} from './schedule-routing.module';
import {ScheduleUserComponent} from './schedule-user/schedule-user.component';
import {UserSelectorModalComponent} from './user-selector-modal/user-selector-modal.component';
import {ScheduleTemplateComponent} from './schedule-template/schedule-template.component';

@NgModule({
  declarations: [
    CommentListComponent,
    CommentNewComponent,
    ScheduleEmptyComponent,
    ScheduleUnitComponent,
    EditUnitModalComponent,
    ScheduleWeekdayComponent,
    ScheduleWeekendComponent,
    ScheduleAdminComponent,
    ScheduleUserComponent,
    UserSelectorModalComponent,
    ScheduleTemplateComponent
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
    SharedModule,
    FlexLayoutModule,
    FormsModule
  ],
  entryComponents: [
    EditUnitModalComponent,
    CommentListComponent,
    UserSelectorModalComponent
  ]
})
export class ScheduleModule {
}
