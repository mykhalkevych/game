import { Message } from 'src/app/models/message';

export interface MessagesStateModel {
  messages: Message[];
}

export class CreateChatRoom {
  static readonly type = '[Messages] Create chat';
  constructor(public payload: string) {}
}

export class SendMessage {
  static readonly type = '[Messages] Send';
  constructor(public payload: { chatId: string; message: Message }) {}
}

export class GetMessages {
  static readonly type = '[Messages] Get Messages';
  constructor(public payload: string) {}
}

export class DeleteMessage {
  static readonly type = '[Messages] Delete Message';
  constructor(public payload: Message) {}
}

export class CleanMessages {
  static readonly type = '[Messages] Clean Messages';
  constructor(public payload: string) {}
}
