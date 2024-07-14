import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface XPItem {
  category: string;
  source: string;
  normalXP: string;
  inputType: 'checkbox' | 'radiobutton';
}
@Component({
  selector: 'app-catching-calculator',
  templateUrl: './catching-calculator.component.html',
  styleUrl: './catching-calculator.component.css'
})

export class CatchingCalculatorComponent implements OnInit {
  xpEvent: any;
  luckyEgg: any;
  items: XPItem[] = [];
  selectedXP: XPItem[] = [];
  totalXP: number = 0;
  catchedPokemon: { xpNeeded: number, capturesNeeded: number }[] = [];
  ngOnInit() {
    this.items = [
      { category: 'Capture Pokémon', source: 'Capture Pokémon', normalXP: '100', inputType: 'checkbox' },
      { category: 'Curve Ball', source: 'Curve Ball', normalXP: '20', inputType: 'checkbox' },
      { category: 'Nice/Great/Excellent', source: 'Nice throw', normalXP: '20', inputType: 'radiobutton' },
      { category: 'Nice/Great/Excellent', source: 'Great throw', normalXP: '100', inputType: 'radiobutton' },
      { category: 'Nice/Great/Excellent', source: 'Excellent Throw', normalXP: '1000', inputType: 'radiobutton' },
      { category: 'First Throw', source: 'First Throw', normalXP: '50', inputType: 'checkbox' }
    ];
    /*{ source: 'Catch a Pokémon with the same time as an active Mega Evolved Pokémon', normalXP: '25 XP' },
    { source: 'Pokémon runs away', normalXP: '25 XP' },
    { source: 'Evolving a Pokémon', normalXP: '1000 XP' },
    { source: 'Hatching a 2km Egg', normalXP: '500 XP' },
    { source: 'Hatching a 5km Egg', normalXP: '1000 XP' },
    { source: 'Hatching a 7km Egg', normalXP: '1500 XP' },
    { source: 'Hatching a 10km Egg', normalXP: '1000 XP' },
    { source: 'Hatching a 12km Egg', normalXP: '4000 XP' },
    { source: 'Spinning a Photo Disc at a PokéStop', normalXP: '100 XP' },
    { source: 'Spinning a Photo Disc at an enemy/neutral Gym (No badge)', normalXP: '25 XP' },
    { source: 'Spinning a Photo Disc at a friendly Gym (No badge)', normalXP: '31 XP' },
    { source: 'Spinning a Photo Disc at an enemy/neutral Gym (Bronze)', normalXP: '50 XP' },
    { source: 'Spinning a Photo Disc at a friendly Gym (Bronze)', normalXP: '63 XP' },
    { source: 'Spinning a Photo Disc at an enemy/neutral Gym (Silver)', normalXP: '75 XP' },
    { source: 'Spinning a Photo Disc at a friendly Gym (Silver)', normalXP: '94 XP' },
    { source: 'Spinning a Photo Disc at an enemy/neutral Gym (Gold)', normalXP: '100 XP' },
    { source: 'Spinning a Photo Disc at a friendly Gym (Gold)', normalXP: '125 XP' },
    { source: 'Bonus for spinning 10 unique PokéStops in 30 minutes', normalXP: '100 XP' },
    { source: 'Bonus for spinning a new PokéStop', normalXP: '300 XP' },
    { source: 'Completing a Research Breakthrough', normalXP: '3000 XP' },
    { source: 'First catch of the day', normalXP: '1500 XP' },
    { source: 'Daily Bonus for spinning a PokéStop on days one to six', normalXP: '500 XP' },
    { source: 'Daily Bonus for PokéStop on day seven', normalXP: '2000 XP' },
    { source: 'Daily Bonus for catching Pokémon', normalXP: '500 XP' },
    { source: 'Daily Bonus for catching Pokémon on day seven', normalXP: '20,000 XP' },
    { source: 'Feeding berry to Pokémon in a Gym', normalXP: '50 XP' },
    { source: 'Win Gym battle', normalXP: '300 XP' },
    { source: 'Defeat every Pokémon in an enemy Gym in a single attempt', normalXP: '150 XP' },
    { source: 'Defeat an enemy Gym', normalXP: '1000 XP' },
    { source: 'Completing a Tier 1 Raid', normalXP: '3500 XP' },
    { source: 'Completing a Tier 3 or Tier 4 Raid', normalXP: '5000 XP' },
    { source: 'Completing a Tier 5 (Legendary) Raid', normalXP: '10,000 XP' },
    { source: 'Completing an Elite Raid', normalXP: '12,000 XP' },
    { source: 'Completing a Mega Legendary Raid', normalXP: '13,000 XP' },
    { source: 'Sending a Gift', normalXP: '200 XP' },
    { source: 'Unlocking Great Friend status', normalXP: '10,000 XP' },
    { source: 'Unlocking Ultra Friend status', normalXP: '50,000 XP' },
    { source: 'Unlocking Best Friend status', normalXP: '100,000 XP' },
  ];*/
  }
  calculateTotalXP() {
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
