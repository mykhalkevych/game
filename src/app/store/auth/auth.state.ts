import { AuthStateModel, Login, Logout, SingUp } from './auth.actions';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/authUser';

const defaultUser = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'));
  }
  return null;
};

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    authenticated: !!localStorage.getItem('user'),
    user: defaultUser()
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
      tap(result => {
        const { uid, email, displayName, photoURL } = result.user;
        ctx.patchState({
          user: { uid, email, displayName, photoURL }
        });
      })
    );
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.signIn(action.payload).pipe(
      tap(result => {
        localStorage.setItem('user', JSON.stringify(result.user));
        const { uid, email, displayName, photoURL } = result.user;
        ctx.setState({
          authenticated: true,
          user: { uid, email, displayName, photoURL }
        });
      }),
      catchError(err => {
        console.log(err);
        return err;
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
          user: null
        });
      })
    );
  }
}
