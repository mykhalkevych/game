import { GameStatus } from '../enums/GameStatus';

export interface Game {
  id?: string;
  name: string;
  maxPlayers: number;
  playersCount: number;
  status: GameStatus;
}
