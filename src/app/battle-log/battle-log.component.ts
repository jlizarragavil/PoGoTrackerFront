import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  selectedLeagueEdit: any = null;
  infoBeingShown: string = '';
  victoriesEdit: any = null;
  subLeagueEdit: any = null;
  seasonEdit: any = null;
  eloEdit: any = null;
  maximumElo: any = null
  username: string = '';
  leagueSelected: string = '';
  overviewChart: any;
  overviewChartOptions: any;
  displayModal: boolean = false;
  displayModalEdit: boolean = false;
  logToDelete: string = '';
  logToDeleteModal: string = '';
  victoriesModal: any;
  defeatsModal: any;
  eloToDelete: any = null;
  checkboxColor: string = 'black';

  newBattleLog: BattleLog = {
    league: '',
    subLeague: '',
    victories: 0,
    defeats: 0,
    elo: 0,
    battlesInSet: 0,
    setNumber: 0,
    date: new Date().toISOString(),
    season: 0
  };
  battleLogs: BattleLog[] = [];
  leagues: any[] = [];
  useLastSeason: boolean = true;
  showLastSeason: boolean = true;
  showDayFormat: boolean = false;
  useLastSeasonData: boolean = true;
  selectedBattleLog: BattleLog | undefined;
  get lastSeason() {
    return Math.max(...this.battleLogs.map(log => log.season));
  }
  constructor(
    private battleLogService: BattleLogService,
    private authService: AuthService,
    private http: HttpClient,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) { }

  onSeasonCheckboxChange(): void {
    if (this.useLastSeason) {
      const lastBattleLog = this.battleLogs[0];
      if (lastBattleLog) {
        this.newBattleLog.season = lastBattleLog.season || 0;
      }
    } else {
      this.newBattleLog.season = 0;
    }
  }
  get filteredBattleLogs() {
    if (this.showLastSeason) {
      const lastSeason = Math.max(...this.battleLogs.map(log => log.season));
      return this.battleLogs.filter(log => log.season === lastSeason).reverse();
    }
    return this.battleLogs;
  }

  onShowDayFormat() {
    console.log(this.showDayFormat)
    const battleLogs = this.filteredBattleLogs;
    if (this.showDayFormat) {
      console.log("Showing day format")
      this.battleLogs = this.groupByDate(battleLogs);
      console.log(this.battleLogs)
    } else {
      this.getBattleLogs(this.username);
    }
  }

  groupByDate(data: any[]): any[] {
    const groupedData: { [date: string]: any } = {};

    data.forEach(item => {

      const date = new Date(item.date).toISOString().split('T')[0];
      if (!groupedData[date]) {
        groupedData[date] = {
          date: date,
          totalVictories: 0,
          totalDefeats: 0,
          eloStart: item.elo,
          eloEnd: item.elo,
          season: 0,
          count: 0,
          result: false
        };
      }

      groupedData[date].totalVictories += item.victories;
      groupedData[date].totalDefeats += item.defeats;
      groupedData[date].season = item.season;
      groupedData[date].eloEnd = item.elo;
      groupedData[date].count += 1;
      if (groupedData[date].totalVictories > groupedData[date].totalDefeats) {
        groupedData[date].result = true;
      } else {
        groupedData[date].result = false;
      }
    });

    const result = Object.values(groupedData).map(group => ({
      league: null,
      subLeague: null,
      date: group.date,
      victories: group.totalVictories,
      season: group.season,
      defeats: group.totalDefeats,
      elo: group.eloStart - group.eloEnd,
      eloEnd: group.eloStart,
      count: group.count,
      result: group.result
    }));

    console.log("groupByDate: ", result);
    return result.reverse();
  }

  onShowLastSeasonChange() {
  }

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
      console.log("logssss: ", logs);
      const eloHistory = this.extractEloHistory(logs);
      console.log(eloHistory);
      this.initializeChart(logs, false);

    });

  }

  extractEloHistory(logs: BattleLog[]): any[] {
    return logs.map((log, index) => ({
      setNumber: index + 1,
      elo: log.elo
    }));
  }
  extractEloDaysHistory(logs: any): any[] {
    return logs.map((log: { eloEnd: any; }, index: number) => ({
      setNumber: index + 1,
      elo: log.eloEnd
    }));
  }
  onLastSeasonChange(event?: boolean) {
    console.log('Checkbox value:', event);

    this.showStats()

  }

  initializeChart(eloHistory: any[], useDays?: boolean) {
    console.log("aaaaaaa: ",eloHistory)
    let labels;
    let dataElo;
    let leyend;
    if(useDays){
      dataElo = eloHistory.map(log => log.eloEnd);
      labels = eloHistory.map(log => log.date);
      leyend = 'Daily Elo history';
    }else{ 
      leyend = 'Elo history per set';
      dataElo = eloHistory.reverse().map(log => log.elo);
      labels = eloHistory.map(log => {
        const date = new Date(log.date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      });
      
    }

    this.overviewChart = {
      labels: labels,
      datasets: [
        {
          label: leyend,
          backgroundColor: 'rgba(66, 165, 245, 0.2)', // Azul claro transparente
          borderColor: '#42A5F5', // Azul
          pointBackgroundColor: '#42A5F5',
          data: dataElo,
          borderWidth: 2,
          fill: true,
        }
      ]
    };
    console.log("lo de la tabla: ", this.overviewChart)
    this.overviewChartOptions = this.getChartOptions(Math.max(...dataElo), Math.min(...dataElo));
  }

  editBattleLog(log: BattleLog) {
    console.log(this.displayModalEdit);
    console.log('Editing Battle Log:', log);
    this.displayModalEdit = true;
    console.log(this.displayModalEdit);
    this.selectedBattleLog = log;

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
          display: true
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
    console.log(this.leagueSelected);
    console.log(this.newBattleLog.elo);
    if (!this.leagueSelected || this.newBattleLog.elo === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in the League and Elo fields.' });
      return;
    }
    if (this.useLastSeason) {
      this.newBattleLog.season = this.lastSeason;
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
        date: new Date().toISOString(),
        season: 0 // Reiniciar el campo temporada
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
    this.defeatsModal = date.defeats;

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
    this.displayModalEdit = false;
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

  updateBattleLog(log?: BattleLog) {
    console.log(log);
    console.log("datos");
    console.log("Liga " + this.leagueSelected);
    console.log("subLiga " + this.subLeagueEdit);
    console.log("victorias " + this.victoriesEdit);
    if (this.victoriesEdit) {
      console.log("derrotas " + (5 - this.victoriesEdit));
    } else {
      console.log("derrotas null");
    }

    console.log("elo " + this.eloEdit);
    console.log("season " + this.seasonEdit);
    if (log) {
      console.log("Date  " + log.date);
    }

    const updatedLog = {
      elo: this.eloEdit !== undefined ? this.eloEdit : undefined,
      league: this.leagueSelected ? this.leagueSelected : undefined,
      subleague: this.subLeagueEdit ? this.subLeagueEdit : undefined,
      victories: this.victoriesEdit !== undefined ? this.victoriesEdit : undefined,
      date: log ? log.date : new Date().toISOString(),
      season: this.seasonEdit !== undefined ? this.seasonEdit : undefined
    };

    const filteredUpdatedLog = Object.fromEntries(
      Object.entries(updatedLog).filter(([_, v]) => v !== undefined)
    );

    console.log("cuerpo a enviar: ", filteredUpdatedLog);

    this.battleLogService.updateBattleLog(this.username, filteredUpdatedLog).subscribe(
      response => {
        console.log('Battle log updated successfully', response);
        this.messageService.add({ severity: 'success', summary: 'Battle Log Added', detail: "Set updated successfully" });

      },
      error => {
        console.error('Error updating battle log', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error :v' });
      }
    );
    this.getBattleLogs(this.username);
    this.displayModalEdit = false;

  }

  showStats(showLast?: boolean, daysFromat?: boolean): void {

    console.log(this.battleLogs);
    if(daysFromat){
      const eloHistory = this.extractEloDaysHistory(this.battleLogs);
      console.log("eloHistory: ", eloHistory);
      this.initializeChart(this.battleLogs, true);
    }
    const league = this.newBattleLog.league;
    const subLeague = this.newBattleLog.subLeague;
    var season
    if (showLast) {
      this.infoBeingShown = 'Showing info from current season (' + this.lastSeason + ')';
      season = this.useLastSeasonData ? this.lastSeason : undefined;
    } else {
      this.infoBeingShown = 'Showing info from all season';
      season = null;
    }


    this.battleLogService.getBattleStats(this.username, league, subLeague, season).subscribe(stats => {
      console.log("stats: ", stats)
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
