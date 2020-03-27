import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { SendMessage, CreateChatRoom } from 'src/app/store/messages/messages.actions';
import { MessagesState } from 'src/app/store/messages/messages.state';
import { Message } from 'src/app/models/message';
import { Player } from 'src/app/models/player';
import { PlayersState } from 'src/app/store/players/players.state';
import { PlayersStateModel } from 'src/app/store/players/players.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chatId = '';
  messageText = '';
  currentPlayer: Player;
  messages: Message[] = [];
  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.chatId) {
      this.store.dispatch(new CreateChatRoom(this.chatId));
    }
    this.store.select(MessagesState.Messages).subscribe(res => {
      this.messages = res;
    });
    this.currentPlayer = this.store.selectSnapshot<Player>((state: PlayersStateModel) => state.currentPlayer);
    console.log(this.currentPlayer);
  }

  handleKeyPress(e) {
    if (e.code === 'Enter' && e.ctrlKey) {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.messageText) {
      this.store.dispatch(
        new SendMessage({
          chatId: this.chatId,
          message: {
            player: this.currentPlayer,
            text: this.messageText
          }
        })
      );
    }
  }
}
