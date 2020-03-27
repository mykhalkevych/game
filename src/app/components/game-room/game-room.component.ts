import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {
  public gameId = '';
  constructor(private route: ActivatedRoute) {
    this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit(): void {}
}
