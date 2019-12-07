import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Bus} from '../models/bus.model';
import {BusNewComponent} from './bus-new/bus-new.component';
import {Observable} from 'rxjs';
import {BusDataService} from '../services/bus.data.service';

@Component({
  selector: 'app-admin-busses',
  templateUrl: './admin-busses.component.html',
  styleUrls: ['./admin-busses.component.scss']
})
export class AdminBussesComponent implements OnInit {

  private fetchBusses$: Observable<Bus[]> = this.busDataService.busses$;
  public busses: Bus[];


  constructor(public dialog: MatDialog, private busDataService: BusDataService) {
  this.fetchBusses$.subscribe(busses => (this.busses = busses));
}

  openDialog(b: Bus = null): void {
    const dialogRef = this.dialog.open(BusNewComponent, {
      width: '1000px',
      data: b
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  ngOnInit() {
  }

  get busses$(): Observable<Bus[]> {
    return this.fetchBusses$;
  }

  delete(id: string): void {
    this.busDataService.deleteBus(id).subscribe();
  }
}
