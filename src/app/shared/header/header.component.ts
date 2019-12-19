import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {clearAllBodyScrollLocks, disableBodyScroll} from 'body-scroll-lock';
import * as $ from 'jquery';
import {EditProfileComponent} from '../../authentication/edit-profile/edit-profile.component';
import {SuccessModalComponent} from '../success-modal/success-modal.component';
import {ErrorModalComponent} from '../error-modal/error-modal.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService, private dialog: MatDialog) {
  }

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
    clearAllBodyScrollLocks();
    this.auth.logout();
    this.router.navigateByUrl('login');
  }

  navigate(url: string) {
    clearAllBodyScrollLocks();
    this.router.navigateByUrl(url);
  }

  private openAccountPopup() {
    this.dialog.open(EditProfileComponent, {
      width: '1000px',
      data: {user: this.auth.currentUser, isAdmin: false}
    }).afterClosed().subscribe(message => {
      if (message && message !== false) {
        this.dialog.open(SuccessModalComponent, {
          width: '300px',
          data: {message}
        });
      } else if (message === false) {
        // Open error dialog
        this.dialog.open(ErrorModalComponent, {
          width: '300px',
          data: {message: 'Probeer later opnieuw.'}
        });
      }
    });
  }
}
