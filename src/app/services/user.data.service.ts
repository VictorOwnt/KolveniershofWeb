import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {API_URL} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) {
  }

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

  patchUser(user: User): Observable<User> {
    return this.http
      .patch(`${API_URL}/users/id/${user.id}`, user)
      .pipe(map(User.fromJSON));
  }

  deleteUser(user: User): Observable<boolean> {
    return this.http.delete<boolean>(`${API_URL}/users/id/${user.id}`);
  }
}
