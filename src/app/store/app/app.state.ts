import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthState } from '../auth/auth.state';
import { Injectable } from '@angular/core';
import { AppStateModel, Loading } from './app.actions';

@State<AppStateModel>({
  name: 'app',
  defaults: {
    isLoading: false
  },
  children: [AuthState]
})
@Injectable()
export class AppState {
  @Selector()
  static isLoading(state: AppStateModel): boolean {
    return state.isLoading;
  }
  constructor() {}

  @Action(Loading)
  loading(ctx: StateContext<AppStateModel>, action: Loading) {
    ctx.patchState({
      isLoading: action.payload
    });
  }
}
