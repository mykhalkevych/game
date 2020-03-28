import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PlayersStateModel, CreatePlayer, GetPlayer } from './players.actions';
import { Player } from 'src/app/models/player';
import { PlayersService } from 'src/app/services/players.service';

const defaultUserId = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user')).uid;
  }
  return null;
};

@Injectable()
@State<PlayersStateModel>({
  name: 'players',
  defaults: {
    currentPlayer: null,
    players: []
  }
})
export class PlayersState {
  @Selector()
  static currentPlayer(state: PlayersStateModel): Player {
    return state.currentPlayer;
  }

  constructor(private playersService: PlayersService) {}

  @Action(CreatePlayer)
  createPlayer(ctx: StateContext<PlayersStateModel>, action: CreatePlayer) {
    return this.playersService.createPlayer(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          currentPlayer: action.payload
        });
      })
    );
  }
  @Action(GetPlayer)
  getPlayer(ctx: StateContext<PlayersStateModel>, action: GetPlayer) {
    return this.playersService.getPlayer(action.payload.id).pipe(
      tap(res => {
        ctx.patchState({
          currentPlayer: null
        });
      })
    );
  }
}
