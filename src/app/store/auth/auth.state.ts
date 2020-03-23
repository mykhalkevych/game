import { AuthStateModel, Login, Logout, SingUp } from './auth.actions';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const defaultUserId = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user')).uid;
  }
  return null;
};

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    authenticated: !!localStorage.getItem('user'),
    userId: defaultUserId()
  }
})
export class AuthState {
  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.authenticated;
  }

  constructor(private authService: AuthService) {}

  @Action(SingUp)
  singup(ctx: StateContext<AuthStateModel>, action: SingUp) {
    return this.authService.singUp(action.payload).pipe(
      tap((result: any) => {
        ctx.patchState({
          userId: result.user.uid
        });
      })
    );
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.signIn(action.payload).pipe(
      tap((result: any) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        ctx.setState({
          authenticated: true,
          userId: result.user.uid
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        localStorage.removeItem('user');
        ctx.setState({
          authenticated: false,
          userId: null
        });
      })
    );
  }
}
