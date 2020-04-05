import { Card } from './card';

export interface Player {
  id?: string;
  name: string;
  email: string;
  photo?: string;
  cards?: Card[];
  gameId: string;
}
