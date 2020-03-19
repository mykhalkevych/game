import { AuthStateModel, Login, Logout } from './auth.actions';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null
  }
})
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthService) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.signIn(action.payload).pipe(
      tap((result: any) => {
        ctx.patchState({
          token: result.token,
          username: action.payload.email
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
          token: null,
          username: null
        });
      })
    );
  }
}
