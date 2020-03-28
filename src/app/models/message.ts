import { Player } from './player';

export interface Message {
  text: string;
  sentTime: string;
  player: Player;
}
