import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, share, catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class WorkDayDataService{
    public loadingError$ = new Subject<string>();
    constructor(private http:HttpClient){}
  }