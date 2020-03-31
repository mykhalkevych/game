import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GamesStateModel, CreateGame, GetGames, GetGame, JoinToGame } from './games.actions';
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

  @Selector()
  static Games(state: GamesStateModel): Game[] {
    return state.games;
  }

  constructor(private gamesService: GamesService) {}

  @Action(CreateGame)
  createGame(ctx: StateContext<GamesStateModel>, action: CreateGame) {
    return this.gamesService.createGame(action.payload);
  }

  @Action(JoinToGame)
  joinToGame(ctx: StateContext<GamesStateModel>, action: JoinToGame) {
    return this.gamesService.joinToGame(action.payload).pipe(
      tap(res => {
        console.log(res);
      })
    );
  }

  @Action(GetGame)
  getGame(ctx: StateContext<GamesStateModel>, action: GetGame) {
    return this.gamesService.getGame(action.payload).pipe(
      tap(res => {
        ctx.patchState({
          currentGame: res
        });
      })
    );
  }

  @Action(GetGames)
  getGames(ctx: StateContext<GamesStateModel>) {
    return this.gamesService.getGames().pipe(
      tap(res => {
        ctx.patchState({
          games: [...res]
        });
      })
    );
  }
}
