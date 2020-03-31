import { GameStatus } from 'src/app/enums/GameStatus';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';

export interface GamesStateModel {
  currentGame: Game;
  games: Game[];
}

export class CreateGame {
  static readonly type = '[Games] Create';
  constructor(public payload: Game) {}
}

export class JoinToGame {
  static readonly type = '[Games] Join';
  constructor(public payload: { gameId: string; player: Player }) {}
}

export class UpdateGame {
  static readonly type = '[Games] Update';
  constructor(public payload: Game) {}
}

export class DeleteGame {
  static readonly type = '[Games] Delete';
}

export class GetGame {
  static readonly type = '[Games] Get Game';
  constructor(public payload: string) {}
}

export class GetGames {
  static readonly type = '[Games] Get Games';
}
