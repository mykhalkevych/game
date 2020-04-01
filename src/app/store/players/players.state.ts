import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  PlayersStateModel,
  CreatePlayer,
  GetPlayer,
  UploadAvatar,
  GetGamePlayers,
  JoinToGame
} from './players.actions';
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
    players: [],
    gamePlayers: []
  }
})
export class PlayersState {
  @Selector()
  static currentPlayer(state: PlayersStateModel): Player {
    return state.currentPlayer;
  }

  @Selector()
  static players(state: PlayersStateModel): Player[] {
    return state.players;
  }

  @Selector()
  static gamePlayers(state: PlayersStateModel): Player[] {
    return state.gamePlayers;
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
    return this.playersService.getPlayer(action.payload).pipe(
      tap(res => {
        ctx.patchState({
          currentPlayer: res
        });
      })
    );
  }

  @Action(GetGamePlayers)
  getGamePlayers(ctx: StateContext<PlayersStateModel>, action: GetGamePlayers) {
    return this.playersService.getGamePlayers(action.payload).pipe(
      tap(res => {
        ctx.patchState({
          gamePlayers: res
        });
      })
    );
  }

  @Action(JoinToGame)
  joinToGame(ctx: StateContext<PlayersStateModel>, action: JoinToGame) {
    return this.playersService.joinToGame(action.payload).pipe(
      tap(res => {
        console.log(res);
      })
    );
  }

  @Action(UploadAvatar)
  uploadAvatar(ctx: StateContext<PlayersStateModel>, action: UploadAvatar) {
    return this.playersService.uploadAvatar(action.payload).pipe(
      tap(res => {
        console.log(res);
        res.subscribe(fileUrl => {
          this.playersService.updatePlayer({
            playerId: action.payload.playerId,
            player: {
              photo: fileUrl
            }
          });
        });
      })
    );
  }
}
