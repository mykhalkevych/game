import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import 'firebase/firestore';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';
import { Message } from 'src/app/models/message';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messagesColection: AngularFirestoreCollection<Message>;
  readonly colectionName = 'messages';
  constructor(private readonly afs: AngularFirestore) {
    this.messagesColection = this.afs.collection<Message>(this.colectionName);
  }

  createChatRoom(id: string) {
    this.messagesColection
      .doc(id)
      .get()
      .subscribe(res => {
        console.log(res);
        if (!res.exists) {
          this.messagesColection.doc(id).set({
            messages: []
          });
        }
      });
  }

  sendMessages({ chatId, message }) {
    const messagesRef = this.messagesColection.doc(chatId);
    return from(
      messagesRef.update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      })
    );
  }

  getMessages(chatId: string) {
    return this.messagesColection.doc(chatId).valueChanges();
  }
}
