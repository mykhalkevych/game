import { CardSuits } from '../enums/CardSuits';
import { CardValues } from '../enums/CardValues';

export interface Card {
  suit: CardSuits;
  value: CardValues;
}
