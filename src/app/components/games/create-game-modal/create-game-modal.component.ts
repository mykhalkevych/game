import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game';
import { GameStatus } from 'src/app/enums/GameStatus';
import { Store } from '@ngxs/store';
import { CreateGame, UpdateGame } from 'src/app/store/games/games.actions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/models/player';
import { PlayersState } from 'src/app/store/players/players.state';

@Component({
  selector: 'app-create-game-modal',
  templateUrl: './create-game-modal.component.html',
  styleUrls: ['./create-game-modal.component.scss']
})
export class CreateGameModalComponent implements OnInit {
  gameForm: FormGroup;
  currentPLayer: Player;
  isEdit = false;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<CreateGameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      maxPlayers: [5, Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    this.dialogRef.afterClosed().subscribe(() => {
      this.gameForm.reset();
    });
    this.currentPLayer = this.store.selectSnapshot(PlayersState.currentPlayer);
    if (this.data.game) {
      this.isEdit = true;
      this.gameForm.get('name').setValue(this.data.game.name);
      this.gameForm.get('maxPlayers').setValue(this.data.game.maxPlayers);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveGame() {
    if (this.gameForm.valid) {
      const game: Game = {
        ...this.gameForm.value,
        playersCount: 0,
        status: GameStatus.Draft,
        gameOwnerId: this.currentPLayer.id
      };
      if (this.isEdit) {
        game.id = this.data.game.id;
        this.store.dispatch(new UpdateGame(game)).subscribe(() => {
          this.closeDialog();
        });
      } else {
        this.store.dispatch(new CreateGame(game)).subscribe(() => {
          this.closeDialog();
        });
      }
    }
  }
}
