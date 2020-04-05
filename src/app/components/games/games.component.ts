import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGameModalComponent } from './create-game-modal/create-game-modal.component';
import { Store } from '@ngxs/store';
import { GetGames, DeleteGame } from 'src/app/store/games/games.actions';
import { GameState } from 'src/app/store/games/games.state';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';
import { PlayersState } from 'src/app/store/players/players.state';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  currentPlayer: Player;
  constructor(public dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetGames());
    this.store.select(GameState.Games).subscribe(res => {
      this.games = res;
    });

    this.store.select(PlayersState.currentPlayer).subscribe(res => {
      this.currentPlayer = res;
    });
  }

  openNewGameModal(game?) {
    this.dialog.open(CreateGameModalComponent, {
      width: '320px',
      data: {
        game
      }
    });
  }

  editGame(game) {
    this.openNewGameModal(game);
  }

  deleteGame(gameId) {
    this.store.dispatch(new DeleteGame(gameId));
  }
}
