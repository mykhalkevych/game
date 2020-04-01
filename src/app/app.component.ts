import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState } from './store/app/app.state';
import { AuthService } from './services/auth.service';
import { Logout } from './store/auth/auth.actions';
import { GetPlayer } from './store/players/players.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  preloading = true;
  isLoading = false;
  constructor(private store: Store, private authService: AuthService, private router: Router) {
    this.store.select(AppState.isLoading).subscribe(loading => {
      this.isLoading = loading;
    });
    this.authService.isLoggedIn$.subscribe(res => {
      console.log(res);
      if (res) {
        this.store.dispatch(new GetPlayer(res.uid));
      } else if (!res && localStorage.getItem('user')) {
        this.store.dispatch(new Logout()).subscribe(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.preloading = false;
    }, 2000);
  }
}
