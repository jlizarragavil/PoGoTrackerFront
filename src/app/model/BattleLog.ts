export interface BattleLog {
    id?: number;
    league: string;
    subLeague: string;
    victories: number;
    defeats: number;
    elo: number;
    battlesInSet: number;
    setNumber: number;
    date: string;
  }
  