import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MessagesStateModel, SendMessage, GetMessages, CreateChatRoom } from './messages.actions';
import { Message } from 'src/app/models/message';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Injectable()
@State<MessagesStateModel>({
  name: 'messages',
  defaults: {
    messages: []
  }
})
export class MessagesState {
  @Selector()
  static Messages(state: MessagesStateModel): Message[] {
    return state.messages;
  }

  constructor(private messagesService: MessagesService) {}

  @Action(CreateChatRoom)
  createChatRoom(ctx: StateContext<MessagesStateModel>, action: CreateChatRoom) {
    return this.messagesService.createChatRoom(action.payload);
  }

  @Action(SendMessage)
  sendMessage(ctx: StateContext<MessagesStateModel>, action: SendMessage) {
    return this.messagesService.sendMessages(action.payload);
  }
  @Action(GetMessages)
  getGames(ctx: StateContext<MessagesStateModel>, action: GetMessages) {
    return this.messagesService.getMessages(action.payload.chatId).pipe(
      tap(res => {
        console.log(res);
        ctx.setState({
          messages: [...res]
        });
      })
    );
  }
}
