import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import 'firebase/storage';
import * as firebase from 'firebase/app';
import { Player } from '../models/player';
import { from, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private playersColection: AngularFirestoreCollection<Player>;
  readonly colectionName = 'players';
  constructor(private readonly afs: AngularFirestore, private storage: AngularFireStorage) {
    this.playersColection = this.afs.collection<Player>(this.colectionName);
  }

  createPlayer(player: Player) {
    const id = player.id;
    return from(this.playersColection.doc(id).set(player));
  }

  getPlayer(id: string) {
    return this.afs.doc<Player>(`${this.colectionName}/${id}`).valueChanges();
  }

  uploadAvatar({ file, playerId }) {
    if (file) {
      const filePath = `avatars/${playerId}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      return task.snapshotChanges().pipe(
        filter(x => x.bytesTransferred === x.totalBytes),
        map(() => {
          return fileRef.getDownloadURL();
        })
      );
    }
  }

  updatePlayer({ playerId, player }) {
    const playerRef = this.playersColection.doc(playerId);
    return from(playerRef.update(player).then(() => playerRef.valueChanges()));
  }
}
