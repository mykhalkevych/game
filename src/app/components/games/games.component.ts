import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGameModalComponent } from './create-game-modal/create-game-modal.component';
import { Store } from '@ngxs/store';
import { GetGames } from 'src/app/store/games/games.actions';
import { GameState } from 'src/app/store/games/games.state';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  constructor(public dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetGames());
    this.store.select(GameState.Games).subscribe(res => {
      console.log(res);
      this.games = res;
    });
  }

  openNewGameModal() {
    this.dialog.open(CreateGameModalComponent, {
      width: '320px'
    });
  }
}
