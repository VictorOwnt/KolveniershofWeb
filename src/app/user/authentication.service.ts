import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../environments/environment';

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
  private user$: BehaviorSubject<string>;
  private tokenString: '';
  public redirectUrl: string;

  constructor(private http: HttpClient) {

    const currentUser = localStorage.getItem(this.tokenKey);
    if (currentUser) {
    let parsedToken = (JSON.parse(currentUser)).token;
    this.tokenString = (JSON.parse(currentUser)).token;
    // parseJwt(localStorage.getItem(this._tokenKey));
    parsedToken = parseJwt(parsedToken);
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this.tokenKey);
        parsedToken = null;
      }
    }
    this.user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.unique_name
    );
  } else {
      this.user$ = new BehaviorSubject<string>(null);

    }
  }

  get token(): string {
    return this.tokenString;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${API_URL}/users/login`,
        { email, password },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
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
      this.user$.next(null);
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
      .post(
        `${API_URL}/users/register`,
        {
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
        },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
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

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http
      .post<boolean>(`${API_URL}/users/isvalidemail`,
      {
        email
      }
    );
  }
}
