import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {WorkdayTemplateDataService} from '../../services/workdayTemplate.data.service';
import {Observable} from 'rxjs';
import {TemplateNewComponent} from './template-new/template-new.component';
import {DeleteModalComponent} from '../../shared/delete-modal/delete-modal.component';
import {SuccessModalComponent} from '../../shared/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../shared/error-modal/error-modal.component';

@Component({
  selector: 'app-admin-templates',
  templateUrl: './admin-templates.component.html',
  styleUrls: ['./admin-templates.component.scss']
})
export class AdminTemplatesComponent implements OnInit {
  templateNames$: Observable<string[]>;

  constructor(public dialog: MatDialog, private workdayTemplateDataService: WorkdayTemplateDataService) {
  }

  ngOnInit() {
    this.templateNames$ = this.workdayTemplateDataService.templateNames$;
  }

  edit(templateName?: string) {
    this.dialog.open(TemplateNewComponent, {
      width: '1000px',
      data: {templateName}
    }).afterClosed().subscribe(message => {
      if (message) {
        this.dialog.open(SuccessModalComponent, {
          width: '300px',
          data: {message}
        });
      }
    });
  }

  delete(templateName: string) {
    // Open delete dialog
    this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: {itemToDelete: 'sjabloon'}
    }).afterClosed().subscribe(canDelete => {
      if (canDelete) {
        // Delete unit & open modal
        this.workdayTemplateDataService.deleteWorkdayTemplates(templateName)
          .subscribe(hasSucceeded => this.openAfterDeleteModal(hasSucceeded));
      }
    });
  }

  openAfterDeleteModal(hasSucceeded: boolean) {
    if (hasSucceeded) {
      // Success dialog
      this.dialog.open(SuccessModalComponent, {
        width: '300px',
        data: {message: 'Verwijderen compleet.'}
      });
    } else {
      // Error dialog
      this.dialog.open(ErrorModalComponent, {
        width: '300px',
        data: {message: 'Verwijderen niet gelukt. Probeer het later opnieuw.'}
      });
    }
  }

}
