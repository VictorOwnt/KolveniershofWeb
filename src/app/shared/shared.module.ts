import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteModalComponent} from './delete-modal/delete-modal.component';
import {SuccessModalComponent} from './success-modal/success-modal.component';
import {ErrorModalComponent} from './error-modal/error-modal.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material';
import {WorkdayFilterPipe} from './pipes/workday-filter.pipe';
import {WarningModalComponent} from './warning-modal/warning-modal.component';
import {CastWorkdayTemplatePipe} from './pipes/cast-workday-template.pipe';
import {CastWorkdayPipe} from './pipes/cast-workday.pipe';
import {CastLunchUnitPipe} from './pipes/cast-lunch-unit.pipe';
import {CastActivityUnitPipe} from './pipes/cast-activity-unit.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DeleteModalComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    WorkdayFilterPipe,
    WarningModalComponent,
    CastWorkdayTemplatePipe,
    CastWorkdayPipe,
    CastLunchUnitPipe,
    CastActivityUnitPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexModule,
    MatDialogModule
  ],
  entryComponents: [
    DeleteModalComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    WarningModalComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DeleteModalComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    WorkdayFilterPipe,
    WarningModalComponent,
    CastWorkdayTemplatePipe,
    CastWorkdayPipe,
    CastLunchUnitPipe,
    CastActivityUnitPipe
  ]
})
export class SharedModule {
}
