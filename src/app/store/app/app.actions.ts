export interface AppStateModel {
  isLoading: boolean;
}

export class Loading {
  static readonly type = '[App] Loading';
  constructor(public payload: boolean) {}
}
