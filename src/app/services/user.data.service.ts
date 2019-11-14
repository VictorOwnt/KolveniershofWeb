import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public loadingError$ = new Subject<string>();
  constructor(private http: HttpClient) { }

  get users$(): Observable<User[]> {
    return this.http.get(`${API_URL}/Users/`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map((list: any[]): User[] => list.map(User.fromJSON))
    );
  }

  addAbsentDate(user: User, absentDate: string) {

    return this.http.post(`${API_URL}/users/addAbsentDate/${user.id}`, absentDate);
  }
}
