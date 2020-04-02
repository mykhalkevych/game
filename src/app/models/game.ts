import { GameStatus } from '../enums/GameStatus';
import { Player } from './player';

export interface Game {
  id: string;
  name: string;
  maxPlayers: number;
  playersCount: number;
  status: GameStatus;
  gameOwnerId: string;
}
