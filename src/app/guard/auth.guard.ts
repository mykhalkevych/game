import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(AuthState.isAuthenticated).pipe(
      map(loggedIn => {
        if (loggedIn) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }

  resolve(): void {
    this.store.select(AuthState.isAuthenticated).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/games']);
      }
    });
  }
}
