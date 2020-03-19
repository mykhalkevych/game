import { AuthStateModel, Login, Logout } from './auth.actions';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    authenticated: !!localStorage.getItem('user')
  }
})
export class AuthState {
  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.authenticated;
  }

  constructor(private authService: AuthService) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.signIn(action.payload).pipe(
      tap((result: any) => {
        localStorage.setItem('user', result);
        ctx.patchState({
          authenticated: true
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState({
          authenticated: false
        });
      })
    );
  }
}
