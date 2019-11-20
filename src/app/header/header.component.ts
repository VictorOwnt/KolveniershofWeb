import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
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
    const menu = $('#menu');
    // Open menu on hamburger click
    $('.hamburger').click(function() {
      $(this).toggleClass('is-active');
      menu.toggleClass('open');
      if (menu.hasClass('open')) {
        disableBodyScroll(menu);
      } else {
        clearAllBodyScrollLocks();
      }
    });
    // Escape key closes menu
    // tslint:disable-next-line:only-arrow-functions
    $('*').keyup(function(e) {
      if (e.key === 'Escape' && menu.hasClass('open')) {
        $('.hamburger').removeClass('is-active');
        menu.removeClass('open');
        clearAllBodyScrollLocks();
      }
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
