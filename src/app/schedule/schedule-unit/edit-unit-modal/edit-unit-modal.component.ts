import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {ActivityUnit} from '../../../models/activityUnit.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../../services/firebase.service';
import {Observable} from 'rxjs';
import {ActivityDataService} from '../../../services/activity.data.service';
import {Activity} from '../../../models/activity.model';
import {map, startWith} from 'rxjs/operators';
import {User} from '../../../models/user.model';
import {UserDataService} from '../../../services/user.data.service';
import {LunchDataService} from '../../../services/lunch.data.service';
import {LunchUnit} from '../../../models/lunchUnit.model';
import {Workday} from '../../../models/workday.model';
import {WorkdayTemplate} from '../../../models/workdayTemplate.model';
import {WorkdayDataService} from '../../../services/workday.data.service';
import {WorkdayTemplateDataService} from '../../../services/workdayTemplate.data.service';
import {BusUnit} from '../../../models/busUnit.model';
import {BusDataService} from '../../../services/bus.data.service';
import {Bus} from '../../../models/bus.model';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './edit-unit-modal.component.html',
  styleUrls: ['./edit-unit-modal.component.scss'],
})
export class EditUnitModalComponent implements OnInit {
  @ViewChild('lunchInput', {static: false}) lunchInput;
  unit: ActivityUnit | LunchUnit | BusUnit = null;
  workday: Workday = null;
  workdayTemplate: WorkdayTemplate = null;
  isAm: boolean = null;
  isDay: boolean = null;
  activities: Activity[] = [];
  activityImgUrl: any = null;
  busses: Bus[] = [];
  mentors: User[] = [];
  clients: User[] = [];
  isActivity = false;
  isBus = false;
  isLunch: false;
  filteredActivities: Observable<Activity[]>;
  public unitFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUnitModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private activityDataService: ActivityDataService,
    private busDataService: BusDataService,
    private lunchDataService: LunchDataService,
    private userDataService: UserDataService,
    private workdayDataService: WorkdayDataService,
    private workdayTemplateDataService: WorkdayTemplateDataService
  ) {
    this.unit = data.unit ? data.unit : null;
    this.workday = data.workday ? data.workday : null;
    this.workdayTemplate = data.workdayTemplate ? data.workdayTemplate : null;
    this.isAm = data.isAm ? data.isAm : null;
    this.isDay = data.isDay ? data.isDay : null;
    this.isActivity = data.isActivity ? data.isActivity : data.unit instanceof ActivityUnit;
    this.isBus = data.isBus ? data.isBus : data.unit instanceof BusUnit;
    this.isLunch = data.isLunch ? data.isLunch : data.unit instanceof LunchUnit;
    activityDataService.activities$.subscribe(activities => this.activities = activities);
    busDataService.busses$.subscribe(busses => this.busses = busses);
    userDataService.mentors$.subscribe(mentors => this.mentors = mentors);
    userDataService.clients$.subscribe(clients => this.clients = clients);
  }

  ngOnInit() {
    if (this.isActivity) {
      if (this.unit) {
        // Download activity icon
        this.activityImgUrl = '';
        this.firebaseService.lookupFileDownloadUrl((this.unit as ActivityUnit).activity.icon, 'icon')
          .subscribe(img => this.activityImgUrl = img);
      }
      // FormGroup for activityUnit
      this.unitFormGroup = this.fb.group({
        activity: [this.unit ? (this.unit as ActivityUnit).activity : null, Validators.required],
        mentors: [this.unit ? (this.unit as ActivityUnit).mentors : null, Validators.required],
        clients: [this.unit ? (this.unit as ActivityUnit).clients : null, Validators.required]
      });
      // Filter activities
      this.filteredActivities = this.unitFormGroup.controls.activity.valueChanges
        .pipe(startWith(''), map(value => this._filterActivities(value)));
    } else if (this.isBus) {
      // FormGroup for busUnit
      this.unitFormGroup = this.fb.group(({
        bus: [this.unit ? (this.unit as BusUnit).bus : null, Validators.required],
        mentors: [this.unit ? (this.unit as BusUnit).mentors : null, Validators.required],
        clients: [this.unit ? (this.unit as BusUnit).clients : null, Validators.required]
      }));
    } else {
      // FormGroup for lunchUnit
      this.unitFormGroup = this.fb.group({
        lunch: [this.unit ? (this.unit as LunchUnit).lunch : null, Validators.required],
        mentors: [this.unit ? (this.unit as LunchUnit).mentors : null, Validators.required],
        clients: [this.unit ? (this.unit as LunchUnit).clients : null, Validators.required]
      });
    }
  }

  private _filterActivities(value: string): Activity[] {
    const filterValue = value.toLowerCase().trim();
    return this.activities.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  compareUsers(user1: User, user2: User) {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  compareBusses(bus1: Bus, bus2: Bus) {
    return bus1 && bus2 ? bus1.id === bus2.id : bus1 === bus2;
  }

  previewActivity(activity: Activity) {
    this.firebaseService.lookupFileDownloadUrl(activity.icon, 'icon').subscribe(x => this.activityImgUrl = x);
  }

  submitUnit() {
    if (this.unit) {
      // Patch unit
      if (this.isActivity) {
        // Create patched unit
        const patchedUnit = this.unit as ActivityUnit;
        patchedUnit.activity = this.unitFormGroup.value.activity;
        patchedUnit.mentors = this.unitFormGroup.value.mentors;
        patchedUnit.clients = this.unitFormGroup.value.clients;
        // Patch ActivityUnit
        this.activityDataService.patchActivityUnit(
          patchedUnit,
          this.workday ? this.workday.id : null,
          this.workdayTemplate ? this.workdayTemplate.id : null
        ).subscribe(value => {
          if (value) {
            // Success dialog
            this.dialogRef.close('Atelier aangepast');
          } else {
            // Error dialog
            this.dialogRef.close(false);
          }
        });
      } else if (this.isBus) {
        // Create patched unit
        const patchedUnit = this.unit as BusUnit;
        patchedUnit.bus = this.unitFormGroup.value.bus;
        patchedUnit.mentors = this.unitFormGroup.value.mentors;
        patchedUnit.clients = this.unitFormGroup.value.clients;
        // Patch ActivityUnit
        this.busDataService.patchBusUnit(
          patchedUnit,
          this.workday ? this.workday.id : null,
          this.workdayTemplate ? this.workdayTemplate.id : null
        ).subscribe(value => {
          if (value) {
            // Success dialog
            this.dialogRef.close('Bus aangepast');
          } else {
            // Error dialog
            this.dialogRef.close(false);
          }
        });
      } else {
        // Create patched unit
        const patchedUnit = this.unit as LunchUnit;
        patchedUnit.lunch = this.unitFormGroup.value.lunch;
        patchedUnit.mentors = this.unitFormGroup.value.mentors;
        patchedUnit.clients = this.unitFormGroup.value.clients;
        // Patch LunchUnit
        this.lunchDataService.patchLunchUnit(
          patchedUnit,
          this.workday ? this.workday.id : null,
          this.workdayTemplate ? this.workdayTemplate.id : null
        ).subscribe(value => {
          if (value) {
            // Success dialog
            this.dialogRef.close('Lunch aangepast');
          } else {
            // Error dialog
            this.dialogRef.close(false);
          }
        });
      }
    } else {
      if (this.isActivity) {
        // Create new unit
        const newUnit = new ActivityUnit(
          this.unitFormGroup.value.activity,
          this.unitFormGroup.value.mentors,
          this.unitFormGroup.value.clients
        );
        // Post unit
        this.activityDataService.postActivityUnit(newUnit).subscribe(activityUnit => {
          if (!activityUnit) {
            // Error dialog
            this.dialogRef.close(false);
          }
          if (this.workday) {
            // Add unit to workday
            if (this.isDay) {
              this.workday.dayActivities.push(activityUnit);
            } else if (this.isAm) {
              this.workday.amActivities.push(activityUnit);
            } else {
              this.workday.pmActivities.push(activityUnit);
            }
            this.workdayDataService.patchWorkday(this.workday).subscribe(value => {
              if (value) {
                // Success dialog
                this.dialogRef.close('Atelier toegevoegd');
              } else {
                // Error dialog
                this.dialogRef.close(false);
              }
            });
          } else if (this.workdayTemplate) {
            // Add unit to workday template
            if (this.isDay) {
              this.workdayTemplate.dayActivities.push(activityUnit);
            } else if (this.isAm) {
              this.workdayTemplate.amActivities.push(activityUnit);
            } else {
              this.workdayTemplate.pmActivities.push(activityUnit);
            }
            this.workdayTemplateDataService.patchWorkdayTemplate(this.workdayTemplate).subscribe(value => {
              if (value) {
                // Success dialog
                this.dialogRef.close('Atelier toegevoegd');
              } else {
                // Error dialog
                this.dialogRef.close(false);
              }
            });
          }
        });
      } else if (this.isBus) {
        // Create new unit
        const newUnit = new BusUnit(
          this.unitFormGroup.value.bus,
          this.unitFormGroup.value.mentors,
          this.unitFormGroup.value.clients
        );
        // Post unit
        this.busDataService.postBusUnit(newUnit).subscribe(busUnit => {
          if (!busUnit) {
            // Error dialog
            this.dialogRef.close(false);
          }
          if (this.workday) {
            // Add unit to workday
            if (this.isAm) {
              this.workday.morningBusses.push(busUnit);
            } else {
              this.workday.eveningBusses.push(busUnit);
            }
            this.workdayDataService.patchWorkday(this.workday).subscribe(value => {
              if (value) {
                // Success dialog
                this.dialogRef.close('Bus toegevoegd');
              } else {
                // Error dialog
                this.dialogRef.close(false);
              }
            });
          } else if (this.workdayTemplate) {
            // Add unit to workday template
            if (this.isAm) {
              this.workdayTemplate.morningBusses.push(busUnit);
            } else {
              this.workdayTemplate.eveningBusses.push(busUnit);
            }
            this.workdayTemplateDataService.patchWorkdayTemplate(this.workdayTemplate).subscribe(value => {
              if (value) {
                // Success dialog
                this.dialogRef.close('Bus toegevoegd');
              } else {
                // Error dialog
                this.dialogRef.close(false);
              }
            });
          }
        });
      } else {
        // Create new unit
        const newUnit = new LunchUnit(
          this.unitFormGroup.value.lunch,
          this.unitFormGroup.value.mentors,
          this.unitFormGroup.value.clients
        );
        // Post unit
        this.lunchDataService.postLunchUnit(newUnit).subscribe(lunchUnit => {
          if (!lunchUnit) {
            this.dialogRef.close(false);
          }
          if (this.workday) {
            // Add unit to workday
            this.workday.lunch = lunchUnit;
            this.workdayDataService.patchWorkday(this.workday).subscribe(value => {
              if (value) {
                // Success dialog
                this.dialogRef.close('Lunch toegevoegd');
              } else {
                // Error dialog
                this.dialogRef.close(false);
              }
            });
          } else if (this.workdayTemplate) {
            // Add unit to workday template
            this.workdayTemplate.lunch = lunchUnit;
            this.workdayTemplateDataService.patchWorkdayTemplate(this.workdayTemplate).subscribe(value => {
              if (value) {
                // Success dialog
                this.dialogRef.close('Lunch toegevoegd');
              } else {
                // Error dialog
                this.dialogRef.close(false);
              }
            });
          }
        });
      }
    }
  }

  clearLunch() {
    this.lunchInput.nativeElement.value = '';
    if (this.unit !== null) {
      (this.unit as LunchUnit).lunch = '';
    }
    this.lunchInput.nativeElement.lunchInput.checkValidity();
  }
}
