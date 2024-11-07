import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../service/auth.service';
interface XPItem {
  category: string;
  source: string;
  normalXP: string;
  inputType: 'checkbox' | 'radiobutton';
}
@Component({
  selector: 'app-catching-calculator',
  templateUrl: './catching-calculator.component.html',
  styleUrl: './catching-calculator.component.scss'
})

export class CatchingCalculatorComponent implements OnInit {
  xpEvent: any;
  luckyEgg: any;
  items: XPItem[] = [];
  selectedXP: XPItem[] = [];
  totalXP: number = 0;
  catchedPokemon: { xpNeeded: number, capturesNeeded: number }[] = [];
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.items = [
      { category: 'Capture Pokémon', source: 'Capture Pokémon', normalXP: '100', inputType: 'checkbox' },
      { category: 'Curve Ball', source: 'Curve Ball', normalXP: '20', inputType: 'checkbox' },
      { category: 'Nice/Great/Excellent', source: 'Nice throw', normalXP: '20', inputType: 'radiobutton' },
      { category: 'Nice/Great/Excellent', source: 'Great throw', normalXP: '100', inputType: 'radiobutton' },
      { category: 'Nice/Great/Excellent', source: 'Excellent Throw', normalXP: '1000', inputType: 'radiobutton' },
      { category: 'First Throw', source: 'First Throw', normalXP: '50', inputType: 'checkbox' }
    ];
  }
  calculateTotalXP() {
    if (!this.isLoggedIn) {
      alert('You need to log in first');
      return;
    }
    this.totalXP = 0;
    this.catchedPokemon = [];
    this.selectedXP.forEach(item => {
      let xpValue = parseInt(item.normalXP);
      let xp = (this.xpEvent !== undefined) ? xpValue * this.xpEvent : xpValue;
      xp *= (this.luckyEgg && this.luckyEgg !== "no") ? 2 : 1;
      this.totalXP += xp;
    });
    for (let xpNeeded = 100000; xpNeeded <= 1000000; xpNeeded += 100000) {
      let capturesNeeded = Math.ceil(xpNeeded / this.totalXP);
      this.catchedPokemon.push({ xpNeeded, capturesNeeded });
    }
  }
}
