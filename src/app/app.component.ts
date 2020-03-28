import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState } from './store/app/app.state';
import { AuthService } from './services/auth.service';
import { Logout } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  preloading = true;
  isLoading = false;
  constructor(private store: Store, private authService: AuthService) {
    this.store.select(AppState.isLoading).subscribe(loading => {
      console.log(loading);
      this.isLoading = loading;
    });
    this.authService.isLoggedIn$.subscribe(res => {
      console.log(res);
      if (!res && localStorage.getItem('user')) {
        console.log(';afds');
        this.store.dispatch(new Logout());
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.preloading = false;
    }, 2000);
  }
}
