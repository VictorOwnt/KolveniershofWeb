import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { API_URL } from '../../environments/environment';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private readonly _tokenKey = "currentUser";
  private _user$: BehaviorSubject<string>;
  private tokenString: "";
  public redirectUrl: string;

  constructor(private http: HttpClient) {

    let currentUser = localStorage.getItem(this._tokenKey);
    if(currentUser){
    let parsedToken = (JSON.parse(currentUser)).token;
    this.tokenString = (JSON.parse(currentUser)).token;
    // parseJwt(localStorage.getItem(this._tokenKey));
    parsedToken = parseJwt(parsedToken);
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.unique_name
    );
  }
    else{
      this._user$ = new BehaviorSubject<string>(null);

    }
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    return this.tokenString;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${API_URL}/users/login`,
        { email, password },
        { responseType: "text" }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem(this._tokenKey);
      this._user$.next(null);
    }
  }

  register(
    userName: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return this.http
      .post(
        `${API_URL}/register`,
        {
          userName,
          firstname,
          lastname,
          email,
          password,
          passwordConfirmation: password
        },
        { responseType: "text" }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  checkUserNameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(`${API_URL}/checkusername`, {
      params: { email }
    });
  };
}
