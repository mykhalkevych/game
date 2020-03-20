export interface AuthStateModel {
  authenticated: boolean;
}

export class SingUp {
  static readonly type = '[Auth] Sing Up';
  constructor(public payload: { name: string; email: string; password: string }) {}
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
