import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  loggedInUser$ = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private _authenticationService: AuthenticationService
  ) {
    this.setCurrentUserFromLocalStorage();
  }

  logout() {
    this._authenticationService.logout();
    this.router.navigateByUrl('login');
    if (localStorage.getItem('currentUser')) {
      // om cookie te verwijderen in local storage
      localStorage.removeItem('currentUser');
    }
  }

  ngOnInit() {}

  setCurrentUserFromLocalStorage() {
    if (localStorage.getItem('currentUser')) {
      this.loggedInUser$ = new BehaviorSubject<string>(
        User.fromJSON(JSON.parse(localStorage.getItem('currentUser'))).email
      );
    }
  }
  isAdmin(): boolean {
    return User.fromJSON(JSON.parse(localStorage.getItem('currentUser'))).admin;
  }
}
