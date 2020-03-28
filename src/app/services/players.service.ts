import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Player } from '../models/player';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private playersColection: AngularFirestoreCollection<Player>;
  readonly colectionName = 'players';
  constructor(private readonly afs: AngularFirestore) {
    this.playersColection = this.afs.collection<Player>(this.colectionName);
  }

  createPlayer(player: Player) {
    const id = player.id;
    return from(this.playersColection.doc(id).set(player));
  }

  getPlayer(id: string) {
    return this.afs.doc<Player>(`${this.colectionName}/${id}`).valueChanges();
  }
}
