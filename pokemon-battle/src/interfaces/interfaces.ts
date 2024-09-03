export interface Pokemon {
  id: string;
  name: string;
  imageUrl: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface BattleResult {
  winner: string;
  loser: string;
  battleLog: string[];
};