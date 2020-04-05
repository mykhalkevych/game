import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';
import { Game } from '../models/game';
import { Player } from '../models/player';

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

  updateGame(game: Game) {
    console.log(game);
    const gameRef = this.gamesColection.doc(game.id);
    return from(gameRef.update(game));
  }

  deleteGame(gameId: string) {
    const gameRef = this.gamesColection.doc(gameId);
    return from(gameRef.delete());
  }

  getGame(id: string) {
    return this.afs.doc<Game>(`${this.colectionName}/${id}`).valueChanges();
  }

  getGames() {
    return this.gamesColection.valueChanges();
  }
}
