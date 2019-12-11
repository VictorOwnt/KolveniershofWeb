import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public loadingError$ = new Subject<string>();
  constructor(private http: HttpClient) { }

  get users$(): Observable<User[]> {
    return this.http
      .get(`${API_URL}/users/`)
      .pipe(catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }), map((list: any[]): User[] => list.map(User.fromJSON))
    );
  }

  get mentors$(): Observable<User[]> {
    return this.http
      .get(`${API_URL}/users/mentors`)
      .pipe(map((list: any[]): User[] => list.map(User.fromJSON)));
  }

  get clients$(): Observable<User[]> {
    return this.http
      .get(`${API_URL}/users/clients`)
      .pipe(map((list: any[]): User[] => list.map(User.fromJSON)));
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get(`${API_URL}/users/id/${id}`)
      .pipe(map(User.fromJSON));
  }
}
