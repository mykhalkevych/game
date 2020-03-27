import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
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
    console.log(id);
    return from(
      this.messagesColection.doc(id).set({
        messages: []
      })
    );
  }

  sendMessages({ chatId, message }) {
    console.log(chatId);
    console.log(message);
    return from(this.messagesColection.doc(chatId).set(message));
  }

  getMessages(chatId: string) {
    return this.messagesColection.doc<Message[]>(chatId).valueChanges();
  }
}
