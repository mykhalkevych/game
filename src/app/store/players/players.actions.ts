import { Player } from 'src/app/models/player';

export interface PlayersStateModel {
  currentPlayer: Player;
  players: Player[];
}

export class CreatePlayer {
  static readonly type = '[Players] Create';
  constructor(public payload: { id: string; name: string; email: string }) {}
}

export class UpdatePlayer {
  static readonly type = '[Players] Update';
  constructor(public payload: { email: string; password: string }) {}
}

export class DeletePlayer {
  static readonly type = '[Players] Delete';
}

export class GetPlayer {
  static readonly type = '[Players] Get Player';
  constructor(public payload: { id: string }) {}
}

export class GetPlayers {
  static readonly type = '[Players] Get Players';
}
