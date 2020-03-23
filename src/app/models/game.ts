import { GameStatus } from '../enums/GameStatus';

export interface Game {
  id?: string;
  name: string;
  maxPLayers: number;
  playersCount: number;
  status: GameStatus;
}
