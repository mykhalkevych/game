import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from 'src/app/store/auth/auth.actions';
import { Router } from '@angular/router';
import { Loading } from 'src/app/store/app/app.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(new Loading(true));
    this.store.dispatch(new Logout()).subscribe(() => {
      this.store.dispatch(new Loading(false));
      this.router.navigate(['/login']);
    });
  }
}
