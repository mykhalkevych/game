import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GamesStateModel, CreateGame } from './games.actions';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';

@Injectable()
@State<GamesStateModel>({
  name: 'games',
  defaults: {
    currentGame: null,
    games: []
  }
})
export class GameState {
  @Selector()
  static currentGame(state: GamesStateModel): Game {
    return state.currentGame;
  }

  constructor(private gamesService: GamesService) {}

  @Action(CreateGame)
  createGame(ctx: StateContext<GamesStateModel>, action: CreateGame) {
    const games = ctx.getState().games;
    return this.gamesService.createGame(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          currentGame: action.payload,
          games: [action.payload, ...games]
        });
      })
    );
  }
  // @Action(GetPlayer)
  // getPlayer(ctx: StateContext<PlayersStateModel>, action: GetPlayer) {
  //   return this.gamesService.g(action.payload.id).pipe(
  //     tap(res => {
  //       console.log(res.data());
  //       ctx.patchState({
  //         currentPlayer: null
  //       });
  //     })
  //   );
  // }
}
