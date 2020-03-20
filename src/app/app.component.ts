import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState } from './store/app/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  preloading = true;
  isLoading = false;
  constructor(private store: Store) {
    this.store.select(AppState.isLoading).subscribe(loading => {
      console.log(loading);
      this.isLoading = loading;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.preloading = false;
    }, 2000);
  }
}
