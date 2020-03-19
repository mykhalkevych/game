import { State } from '@ngxs/store';
import { AuthStateModel } from '../auth/auth.actions';
import { AuthState } from '../auth/auth.state';
import { Injectable } from '@angular/core';

export interface AppStateModel {
  auth: AuthStateModel;
}

@State<AppStateModel>({
  name: 'app',
  children: [AuthState]
})
@Injectable()
export class AppState {
  constructor() {}
}
