import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { BehaviorSubject } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUser = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.setCurrentUserFromLocalStorage();
  }

  ngOnInit() {
    $('.hamburger--squeeze').click(function() {
      $(this).toggleClass('is-active');
    });
  }

  setCurrentUserFromLocalStorage() {
    if (localStorage.getItem('currentUser')) {
      this.loggedInUser = new BehaviorSubject<string>(
        User.fromJSON(JSON.parse(localStorage.getItem('currentUser'))).email
      );
    }
  }

  isAdmin(): boolean {
    return User.fromJSON(JSON.parse(localStorage.getItem('currentUser'))).admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('login');
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
  }
}
