import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  preloading = true;

  constructor() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.preloading = false;
    }, 2000);
  }
}
