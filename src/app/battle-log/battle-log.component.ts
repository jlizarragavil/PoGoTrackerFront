import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { XpServiceService } from '../service/xp-service.service'; // Ajusta la ruta según tu estructura
import { AuthService } from '../service/auth.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.css']
})
export class BattleLogComponent implements OnInit {
  battleLogForm: FormGroup;
  battleLogs: any[] = []; // Define adecuadamente según la estructura de BattleLog
  username: string | null = null;
  xpTrackerId: string | null = null;
  filterValue: string = '';
  constructor(
    private fb: FormBuilder,
    private xpTrackerService: XpServiceService,
    private authService: AuthService
  ) {
    this.battleLogForm = this.fb.group({
      league: ['', Validators.required],
      victories: [0, Validators.required],
      defeats: [0, Validators.required],
      elo: [0, Validators.required],
      battlesInSet: [0, Validators.required],
      setNumber: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    if (this.username) {
      this.xpTrackerId = this.username; // Usar el nombre de usuario como ID de XPTracker
      this.loadBattleLogs();
    } else {
      console.error('No user is logged in.');
    }
  }

  loadBattleLogs(): void {
    if (this.xpTrackerId) {
      this.xpTrackerService.getXPTrackerById(this.xpTrackerId)
        .subscribe(response => {
          if (response && response.battleLog) {
            this.battleLogs = response.battleLog;
          }
        });
    }
  }

  onSubmit(): void {
    if (this.battleLogForm.valid && this.xpTrackerId) {
      const newBattleLog = this.battleLogForm.value;

      this.xpTrackerService.addBattleLog(this.xpTrackerId, newBattleLog)
        .subscribe(
          response => {
            if (response && response.battleLog) {
              this.battleLogs.push(response.battleLog.pop()); // Update the display with the latest battle log
              this.battleLogForm.reset();
            }
          },
          error => {
            console.error('Error adding BattleLog:', error);
          }
        );
    }
  }
  filterTable(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterValue = input.value.toLowerCase();
    this.battleLogs = this.battleLogs.filter(log =>
      log.league.toLowerCase().includes(this.filterValue)
    );
  }
}
