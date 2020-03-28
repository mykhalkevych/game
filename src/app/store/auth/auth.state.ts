import { AuthStateModel, Login, Logout, SingUp } from './auth.actions';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Loading } from '../app/app.actions';

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

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private store: Store) {}

  @Action(SingUp)
  singup(ctx: StateContext<AuthStateModel>, action: SingUp) {
    this.store.dispatch(new Loading(true));
    return this.authService.singUp(action.payload).pipe(
      tap(result => {
        const { uid, email, displayName, photoURL } = result.user;
        ctx.patchState({
          user: { uid, email, displayName, photoURL }
        });
      }),
      catchError(err => {
        this._snackBar.open('Something went wrong!', '', {
          duration: 4000
        });
        return of(err);
      }),
      finalize(() => {
        this.store.dispatch(new Loading(false));
      })
    );
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    this.store.dispatch(new Loading(true));
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
        this._snackBar.open('Your email or password is invalid!', '', {
          duration: 4000
        });
        return of(err);
      }),
      finalize(() => {
        this.store.dispatch(new Loading(false));
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    this.store.dispatch(new Loading(true));
    return this.authService.logout().pipe(
      tap(() => {
        localStorage.removeItem('user');
        ctx.setState({
          authenticated: false,
          user: null
        });
      }),
      finalize(() => {
        this.store.dispatch(new Loading(false));
      })
    );
  }
}
