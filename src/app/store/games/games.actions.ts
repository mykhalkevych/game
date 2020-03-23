import { GameStatus } from 'src/app/enums/GameStatus';
import { Game } from 'src/app/models/game';

export interface GamesStateModel {
  currentGame: Game;
  games: Game[];
}

export class CreateGame {
  static readonly type = '[Games] Create';
  constructor(public payload: { name: string; maxPLayers: number; playersCount: number; status: GameStatus }) {}
}

export class UpdateGame {
  static readonly type = '[Games] Update';
  constructor(public payload: { name: string; maxPLayers: number; playersCount: number; status: GameStatus }) {}
}

export class DeleteGame {
  static readonly type = '[Games] Delete';
}

export class GetGame {
  static readonly type = '[Games] Get Game';
  constructor(public payload: { id: string }) {}
}

export class GetGames {
  static readonly type = '[Games] Get Games';
}
