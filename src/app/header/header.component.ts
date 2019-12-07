import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit() {
    const menu = $('#menu');
    // Open menu on hamburger click
    // tslint:disable-next-line:only-arrow-functions & deprecation
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
    // tslint:disable-next-line:only-arrow-functions & deprecation
    $('*').keyup(function(e) {
      if (e.key === 'Escape' && menu.hasClass('open')) {
        $('.hamburger').removeClass('is-active');
        menu.removeClass('open');
        clearAllBodyScrollLocks();
      }
    });
    // Pyro easter egg
    // tslint:disable-next-line:only-arrow-functions & deprecation
    $('#boom_click').click(function() {
      $('#boom').toggleClass('pyro');
    });
  }

  get loggedInUser(): User {
    return this.auth.currentUser;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }
}
