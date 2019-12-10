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

    // Check if user is logged in
    if (this.auth.currentUser) {
      // Check if trying to navigate to home
      if (state.url === '/') {
        // Navigate to appropriate home page
        if (this.auth.currentUser.admin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/schedule']);
        }
        return true;
      }

      // Check if user has access
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
