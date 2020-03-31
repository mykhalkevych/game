import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game';
import { GameStatus } from 'src/app/enums/GameStatus';
import { Store } from '@ngxs/store';
import { CreateGame } from 'src/app/store/games/games.actions';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-game-modal',
  templateUrl: './create-game-modal.component.html',
  styleUrls: ['./create-game-modal.component.scss']
})
export class CreateGameModalComponent implements OnInit {
  newGameForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, public dialogRef: MatDialogRef<CreateGameModalComponent>) {
    this.newGameForm = this.fb.group({
      name: ['', Validators.required],
      maxPlayers: [5, Validators.required]
    });
  }

  ngOnInit(): void {
    this.dialogRef.afterClosed().subscribe(() => {
      this.newGameForm.reset();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createGame() {
    if (this.newGameForm.valid) {
      const game: Game = {
        ...this.newGameForm.value,
        playersCount: 0,
        status: GameStatus.Draft,
        players: []
      };
      this.store.dispatch(new CreateGame(game)).subscribe(() => {
        this.closeDialog();
      });
    }
  }
}
