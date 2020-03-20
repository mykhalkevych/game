export interface Game {
  id?: string;
  name: string;
  maxPLayers: number;
  playersCount: number;
  status: 'draft' | 'ready' | 'active';
}
