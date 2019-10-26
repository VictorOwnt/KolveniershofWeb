import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {

  loggedInUser$ = this._authenticationService.user$;
  constructor( private router: Router,private _authenticationService: AuthenticationService) {}
  logout() {
    this._authenticationService.logout();
    this.router.navigateByUrl("");
  }
  ngOnInit() {}
}
