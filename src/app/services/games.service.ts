import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Player } from '../models/player';
import 'firebase/firestore';
import { from } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private gamesColection: AngularFirestoreCollection<Player>;
  readonly colectionName = 'games';
  constructor(private readonly afs: AngularFirestore) {
    this.gamesColection = this.afs.collection<Player>(this.colectionName);
  }

  createGame(game: Game) {
    const id = this.afs.createId();
    return from(this.gamesColection.doc(id).set(game));
  }

  getPlayer(id: string) {
    return this.afs.doc<Player>(`${this.colectionName}/${id}`).get();
  }
}
