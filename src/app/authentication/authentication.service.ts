import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {API_URL} from '../../environments/environment';
import {User} from '../models/user.model';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly tokenKey = 'currentUser';
  private readonly user$: BehaviorSubject<string>;
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this.tokenKey));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this.tokenKey);
        parsedToken = null;
      }
    }
    this.user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.username
    );
  }

  get token(): string {
    const localToken = localStorage.getItem(this.tokenKey);
    return !!localToken ? localToken : '';
  }

  get currentUser(): User {
    if (!this.token) {
      return null;
    }
    const fromLocalStorage = parseJwt(localStorage.getItem(this.tokenKey));
    const user = new User(
      fromLocalStorage.firstName,
      fromLocalStorage.lastName,
      fromLocalStorage.email,
      fromLocalStorage.picture,
      fromLocalStorage.address.street,
      fromLocalStorage.address.postalCode,
      fromLocalStorage.address.city,
      fromLocalStorage.admin,
      fromLocalStorage.birthday,
      fromLocalStorage.absentDates
    );
    user.id = fromLocalStorage._id;
    return user;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(`${API_URL}/users/login`, {email, password})
      .pipe(map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem(this.tokenKey, token);
            this.user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem(this.tokenKey);
      setTimeout(() => this.user$.next(null));
    }
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    picture: string,
    birthday: Date,
    street: string,
    city: string,
    postalCode: string
  ): Observable<boolean> {
    return this.http
      .post(`${API_URL}/users/register`, {
        email,
        password,
        firstName,
        lastName,
        picture,
        birthday,
        address: {
          street,
          postalCode,
          city
        }
      })
      .pipe(
        map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem(this.tokenKey, token);
            this.user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  checkEmailAvailability(email: string, oldEmail?: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_URL}/users/isvalidemail`, {email, oldEmail});
  }
}
