import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const shouldBeAdmin: boolean = next.data.shouldBeAdmin || false;

    if (this.auth.currentUser) {
      if (!shouldBeAdmin || this.auth.currentUser.admin) {
        return true;
      }
      this.router.navigate(['/forbidden']);
      return false;
    }
    this.auth.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }

}
