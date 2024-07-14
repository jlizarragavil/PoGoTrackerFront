export interface XPRecord {
  totalXP: number;
  dailyXPDifference: number;
  date: string;
  avgDailyXp: number;
  luckyEgg: boolean;
  xpEvent: number;
}

export interface XPTracker {
  id: string;
  playerName: string;
  xpRecords: XPRecord[];
}