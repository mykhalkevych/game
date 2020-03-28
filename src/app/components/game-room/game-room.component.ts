import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { PlayersState } from 'src/app/store/players/players.state';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {
  public gameId = '';
  constructor(private route: ActivatedRoute, private store: Store) {
    this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit(): void {
    this.store.select(PlayersState.currentPlayer);
  }
}
