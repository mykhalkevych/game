import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { from } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private gamesColection: AngularFirestoreCollection<Game>;
  readonly colectionName = 'games';
  constructor(private readonly afs: AngularFirestore) {
    this.gamesColection = this.afs.collection<Game>(this.colectionName);
  }

  createGame(game: Game) {
    const id = this.afs.createId();
    game.id = id;
    return from(this.gamesColection.doc(id).set(game));
  }

  getGames() {
    return this.gamesColection.valueChanges();
  }
}
