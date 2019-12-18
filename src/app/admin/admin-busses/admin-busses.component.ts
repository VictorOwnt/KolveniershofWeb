import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Bus} from '../../models/bus.model';
import {Observable} from 'rxjs';
import {BusDataService} from '../../services/bus.data.service';
import {SuccessModalComponent} from '../../shared/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../shared/error-modal/error-modal.component';
import {DeleteModalComponent} from '../../shared/delete-modal/delete-modal.component';
import {BusNewComponent} from './bus-new/bus-new.component';

@Component({
  selector: 'app-admin-busses',
  templateUrl: './admin-busses.component.html',
  styleUrls: ['./admin-busses.component.scss']
})
export class AdminBussesComponent implements OnInit {
  busses$: Observable<Bus[]>;

  constructor(public dialog: MatDialog, private busDataService: BusDataService) {
  }

  ngOnInit() {
    this.busses$ = this.busDataService.busses$;
  }

  edit(bus?: Bus) {
    this.dialog.open(BusNewComponent, {
      width: '1000px',
      data: {bus}
    }).afterClosed().subscribe(message => {
      if (message && message !== false) {
        this.dialog.open(SuccessModalComponent, {
          width: '300px',
          data: {message}
        });
      } else if (message === false) {
        // Open error dialog
        this.dialog.open(ErrorModalComponent, {
          width: '300px',
          data: {message: 'Probeer later opnieuw.'}
        });
      }
    });
  }

  delete(bus: Bus) {
    // Open delete dialog
    this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: {itemToDelete: 'bus'}
    }).afterClosed().subscribe(canDelete => {
      if (canDelete) {
        // Delete activity & open modal
        this.busDataService.deleteBus(bus.id)
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
