import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGameModalComponent } from './create-game-modal/create-game-modal.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openNewGameModal() {
    this.dialog.open(CreateGameModalComponent, {
      width: '320px'
    });
  }
}
