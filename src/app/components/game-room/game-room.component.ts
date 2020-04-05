import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { PlayersState } from 'src/app/store/players/players.state';
import { GameState } from 'src/app/store/games/games.state';
import { Game } from 'src/app/models/game';
import { UploadAvatar, GetGamePlayers, JoinToGame } from 'src/app/store/players/players.actions';
import { GetGame, UpdateGame } from 'src/app/store/games/games.actions';
import { Player } from 'src/app/models/player';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {
  gameId = '';
  game: Game;
  players: Player[] = [];
  currentPlayer: Player;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.gameId = this.route.snapshot.params['gameId'];
    this.store.dispatch(new GetGame(this.gameId));
    this.store.dispatch(new GetGamePlayers(this.gameId));
  }

  ngOnInit(): void {
    this.store.select(PlayersState.currentPlayer).subscribe(res => {
      this.currentPlayer = res;
    });
    this.store.select(PlayersState.gamePlayers).subscribe(res => {
      this.players = res;
    });

    combineLatest([this.store.select(PlayersState.currentPlayer), this.store.select(GameState.currentGame)])
      .pipe(
        filter(x => {
          return !!x[0] && !!x[1];
        })
      )
      .subscribe(res => {
        this.currentPlayer = res[0];
        this.game = res[1];
        if (this.currentPlayer && this.game) {
          if (
            this.players.length < this.game.maxPlayers &&
            !this.isPLayerAlreadyJoined(this.players, this.currentPlayer.id)
          ) {
            this.store.dispatch(new JoinToGame({ gameId: this.gameId, playerId: this.currentPlayer.id }));
            this.store.dispatch(new UpdateGame({ ...this.game, playersCount: this.game.playersCount + 1 }));
          }
        }
      });
  }

  isPLayerAlreadyJoined(players: Player[], playerId: string) {
    return players.some(p => p.id === playerId && p.gameId === this.gameId);
  }

  fileChangeEvent(e) {
    const file = e.target.files[0];
    if (file) {
      const playerId = this.currentPlayer.id;
      this.store.dispatch(new UploadAvatar({ file, playerId }));
    }
  }
}
