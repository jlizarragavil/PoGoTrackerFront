import { Component, OnInit } from '@angular/core';
import { BattleLogService } from '../service/battle-log.service';
import { BattleLog } from '../model/BattleLog';
import { AuthService } from '../service/auth.service';
import * as bootstrap from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.scss'],
  providers: [MessageService]
})
export class BattleLogComponent implements OnInit {
  isLoggedIn: boolean = true;
  selectedLeague: any = null;
  maximumElo: any = null
  username: string = '';
  leagueSelected: string = '';
  overviewChart: any;
  overviewChartOptions: any;
  displayModal: boolean = false;
  logToDelete: string = '';
  logToDeleteModal: string = '';
  victoriesModal: any;
  defeatsModal: any;
  eloToDelete: any = null;
  newBattleLog: BattleLog = {
    league: '',
    subLeague: '',
    victories: 0,
    defeats: 0,
    elo: 0,
    battlesInSet: 0,
    setNumber: 0,
    date: new Date().toISOString()
  };
  battleLogs: BattleLog[] = [];
  leagues: any[] = [];

  constructor(
    private battleLogService: BattleLogService,
    private authService: AuthService,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.username = this.authService.getUsername() || '';
    this.getBattleLogs(this.username);
    this.leagues = [
      { label: 'Super', value: 'Super' },
      { label: 'Ultra', value: 'Ultra' },
      { label: 'Master', value: 'Master' }
    ];
  }

  getBattleLogs(id: string): void {
    this.battleLogService.getBattleLogs(id).subscribe(logs => {
      this.battleLogs = logs.reverse();
      const eloHistory = this.extractEloHistory(logs);
      console.log(eloHistory);
      this.initializeChart(eloHistory);

    });

  }

  extractEloHistory(logs: BattleLog[]): any[] {
    return logs.map((log, index) => ({
      setNumber: index + 1,
      elo: log.elo
    }));
  }

  initializeChart(eloHistory: any[]) {
    const labels = eloHistory.map(log => log.setNumber);
    const data = eloHistory.map(log => log.elo);
    this.overviewChart = {
      labels: labels,
      datasets: [
        {
          label: 'Elo History',
          backgroundColor: '#42A5F5',
          data: data,
          borderColor: '#1E88E5',
          borderWidth: 2,
          fill: true,
        }
      ]
    };

    this.overviewChartOptions = this.getChartOptions(Math.max(...data.reverse()), Math.min(...data));
  }

  highlightFirstRow(): void {

    const firstRow = document.getElementById('log-row-0');
    if (firstRow) {
      console.log('Resaltando la fila:', firstRow);
      firstRow.classList.add('highlight-first-row');

      setTimeout(() => {
        firstRow.classList.remove('highlight-first-row');
        console.log('Clase eliminada:', firstRow);
      }, 1000);
    } else {
      console.log('No se encontró la fila');
    }

  }
  getChartOptions(maxElo: number, minElo: number) {
    this.maximumElo = maxElo;
    console.log(this.maximumElo)
    return {
      plugins: {
        legend: {
          display: false
        }
      },
      responsive: true,
      hover: {
        mode: 'index'
      },
      scales: {
        y: {
          max: Math.ceil(maxElo + 100),
          type: 'linear',
          min: Math.ceil(minElo - 100),
          ticks: {
            stepSize: 200,
            callback: (value: number) => {
              return Math.round(value);
            }
          },
          grid: {
            borderDash: [2, 2],
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
          }
        }
      }
    };
  }

  addBattleLog(): void {
    console.log(this.leagueSelected)
    console.log(this.newBattleLog.elo)
    if (!this.leagueSelected || this.newBattleLog.elo === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in the League and Elo fields.' });
      return;
    }
    this.newBattleLog.date = new Date().toISOString();
    this.newBattleLog.league = this.leagueSelected;
    console.log('League selected (before submit):', this.newBattleLog.league);
    console.log('Payload:', this.newBattleLog);
    this.newBattleLog.defeats = 5 - this.newBattleLog.victories;
    this.battleLogService.addBattleLog(this.username, this.newBattleLog).subscribe(log => {
      let toastMessage: string;
      console.log("victorias: ", this.newBattleLog.victories);
      switch (this.newBattleLog.victories) {
        case 0:
          toastMessage = "No worries, we'll blame the lag!";
          break;
        case 1:
          toastMessage = "Hang in there, next one’s yours!";
          break;
        case 2:
          toastMessage = "Not bad, you're warming up!";
          break;
        case 3:
          toastMessage = "Great effort, you'll crush it next time!";
          break;
        case 4:
          toastMessage = "Almost there, one more and you're golden!";
          break;
        case 5:
          toastMessage = "You rock! Champion status unlocked!";
          break;
        default:
          toastMessage = "Keep going! Victory is near!";
      }
      this.messageService.add({ severity: 'success', summary: 'Battle Log Added', detail: toastMessage });
      this.battleLogs.unshift(log);
      this.newBattleLog = {
        league: '',
        subLeague: '',
        victories: 0,
        defeats: 0,
        elo: 0,
        battlesInSet: 0,
        setNumber: 0,
        date: new Date().toISOString()
      };
      this.getBattleLogs(this.username);
      setTimeout(() => {
        this.highlightFirstRow();
      }, 1000);
      
    });
  }

  confirmDelete(date: BattleLog) {
    console.log(date);
    this.logToDelete = date.date;
    const dateStr = this.logToDelete;
    this.victoriesModal = date.victories;
    this.defeatsModal =  date.defeats;

    const dateModal = new Date(dateStr);
    const month = dateModal.getMonth() + 1;
    const day = dateModal.getDate();
    const year = dateModal.getFullYear();

    const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    this.logToDeleteModal = formattedDate;
    this.eloToDelete = date.elo;
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }

  deleteBattleLog(): void {
    this.battleLogService.deleteBattleLogEntry(this.username, this.logToDelete).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Battle log deleted successfully'
        });
        console.log('Battle log deleted:', response);
        
        this.loadBattleLogs();
        
        this.displayModal = false;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete battle log'
        });
        console.error('Error deleting battle log:', error);
      }
    );
  }

  loadBattleLogs() {
    this.battleLogService.getBattleLogs(this.username).subscribe(
      (data) => {
        this.battleLogs = data;
      },
      (error) => {
        console.error('Error loading battle logs:', error);
      }
    );
  }

  onLeagueChange(event: any): void {
    this.leagueSelected = event.value.value;
    console.log('League selected:', this.newBattleLog.league);
  }

  showStats(): void {
    const league = this.newBattleLog.league;
    const subLeague = this.newBattleLog.subLeague;

    this.battleLogService.getBattleStats(this.username, league, subLeague).subscribe(stats => {
      const totalVictoriesCell = document.getElementById('totalVictories');
      const totalDefeatsCell = document.getElementById('totalDefeats');
      const totalSetsCell = document.getElementById('totalSets');
      const winRateCell = document.getElementById('winRate');
      const averageEloCell = document.getElementById('averageElo');

      if (totalVictoriesCell) totalVictoriesCell.innerText = stats.totalVictories;
      if (totalDefeatsCell) totalDefeatsCell.innerText = stats.totalDefeats;
      if (totalSetsCell) totalSetsCell.innerText = stats.totalSets;
      if (winRateCell) winRateCell.innerText = `${stats.winRate.toFixed(2)}%`;
      if (averageEloCell) averageEloCell.innerText = stats.averageElo;

      const modalElement = document.getElementById('statsModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, error => {
      console.error('Error fetching stats:', error);
    });
  }
}
