import { Component } from '@angular/core';

@Component({
  selector: 'app-gbl-game',
  templateUrl: './gbl-game.component.html',
  styleUrl: './gbl-game.component.scss'
})
export class GblGameComponent {
  pokemon = [
    { name: 'Clodsire', atk1: 'Earthquake (8-) ', type1: 'ground', atk2: 'Stone Edge (7-)', type2: 'rock' },
    { name: 'Clodsire', atk1: 'Earthquake (8-) ', type1: 'ground', atk2: 'Slodge Bomb (6)', type2: 'poison' },
    { name: 'Corsola Galarian', atk1: 'Night Shade (5*) ', type1: 'ghost', atk2: 'Power gem (5)', type2: 'rock' },
    { name: 'Feraligatr', atk1: 'Hydro cannon (5)', type1: 'water', atk2: 'Ice Beam (7)', type2: 'ice' },
    { name: 'Gastrodon', atk1: 'Body Slam (4*)', type1: 'normal', atk2: 'Earth Power (6*)', type2: 'ground' },
    { name: 'Annihilape', atk1: 'Rage Fist (6)', type1: 'ghost', atk2: 'Close Combat (8*)', type2: 'ground' },
    { name: 'Diggersby', atk1: 'Fire Punch (5)', type1: 'fire', atk2: 'Scorching Sands  (7-)', type2: 'ground' },
    { name: 'Ariados', atk1: 'Lunge (5)', type1: 'bug', atk2: 'Trailblaze  (5)', type2: 'grass' },
    { name: 'Bibarel', atk1: 'Surf (4*)', type1: 'water', atk2: 'Hyper fang (4)', type2: 'normal' },
    { name: 'Malamar', atk1: 'Superpower (10)', type1: 'fighting', atk2: 'Foul Play (12-)', type2: 'dark' },
    { name: 'Jumpluff', atk1: 'Aerial Ace (5*)', type1: 'flying', atk2: 'Energy Ball (7-)', type2: 'grass' },
    { name: 'Dunsparce', atk1: 'Drill Run (4*)', type1: 'ground', atk2: 'Rock Slide (4*)', type2: 'rock' },
    { name: 'Typhlosion', atk1: 'Blast Burn (3*)', type1: 'fire', atk2: 'Thunder Punch (2)', type2: 'electric' },
    { name: 'Primeape', atk1: 'Rage Fist (4)', type1: 'ghost', atk2: 'Close Combat (5)', type2: 'fighting' },
    { name: 'Mandibuzz', atk1: 'Dark Pulse (4)', type1: 'dark', atk2: 'Aereal Ace (4-)', type2: 'flying' },
    { name: 'Carbink', atk1: 'Power Gem (12)', type1: 'rock', atk2: 'Moonblast (12)', type2: 'fairy' },
    { name: 'Steelix', atk1: 'Psychic Fangs (6)', type1: 'psychic', atk2: 'Breaking Swipe (6)', type2: 'dragon' },
    { name: 'Alolan Sandslash', atk1: 'Ice Punch (5)', type1: 'ice', atk2: 'Drill Run (6)', type2: 'ground' },
    { name: 'Marowak', atk1: 'Bone Club (4*)', type1: 'ground', atk2: 'Rock Slide (5*)', type2: 'rock' },
    { name: 'Marowak Alolan', atk1: 'Bone Club (4*)', type1: 'ground', atk2: 'Shadow Bone (5*)', type2: 'ghost' },
    { name: 'Quagsire', atk1: 'Aqua Tail (5*)', type1: 'water', atk2: 'Stone Edge (7)', type2: 'rock' },
    { name: 'Serperior', atk1: 'Aereal Ace (5)', type1: 'flying', atk2: 'Frenzy Plant (6)', type2: 'grass' },
    { name: 'Toxapex', atk1: 'Brine (8-)', type1: 'water', atk2: 'Sludge wave (10-)', type2: 'poison' },
    { name: 'Altaria', atk1: 'Sky Attack (19-)', type1: 'flying', atk2: 'Moonblast (20)', type2: 'fairy' },
    { name: 'Charjabug', atk1: 'X-Scissor (3*)', type1: 'bug', atk2: 'Discharge (3)', type2: 'electric' },
    { name: 'Machamp', atk1: 'Cross Chop (4)', type1: 'fighting', atk2: 'Rock Slide (5)', type2: 'rock' },
    { name: 'Ninetales Alolan', atk1: 'Weather Ball (5*)', type1: 'ice', atk2: 'Dazzling Gleam (9)', type2: 'fairy' },
    { name: 'Dewong', atk1: 'Icy wind (5*)', type1: 'ice', atk2: 'Drill Run (5*)', type2: 'ground' },
    { name: 'Azumarill', atk1: 'Play rough (6*)', type1: 'fairy', atk2: 'Ice Beam (5)', type2: 'ice' },
    { name: 'Swampert', atk1: 'Hydro Cannon (5)', type1: 'water', atk2: 'Eartquake (9-)', type2: 'ground' },
    { name: 'Umbreon', atk1: 'Foul Play (4*)', type1: 'dark', atk2: 'Last Resort (5-)', type2: 'normal' },
    { name: 'Talonflame', atk1: 'Fly (3-)', type1: 'flying', atk2: 'Flame Charge (3*)', type2: 'fire' },
    { name: 'Lickilicky', atk1: 'Bodyslam (3)', type1: 'normal', atk2: 'Sadow Ball (5-)', type2: 'ghost' },
    { name: 'Bastiodon', atk1: 'Stone Edge (7)', type1: 'rock', atk2: 'Flamethrower (7)', type2: 'fire' },
    { name: 'Drapion', atk1: 'Aqua tail (4)', type1: 'water', atk2: 'Crunch (5)', type2: 'dark' },
    { name: 'Greninja', atk1: 'Hydro cannon (3)', type1: 'water', atk2: 'Night Slash (3*)', type2: 'dark' },
    { name: 'Cresselia', atk1: 'Grass Knot (6)', type1: 'grass', atk2: 'Moonblast (7)', type2: 'fairy' },
    { name: 'Ferrothorn', atk1: 'Power Whip (4)', type1: 'grass', atk2: 'Thunder (5)', type2: 'electric' },
    { name: 'Venusaur', atk1: 'Frenzy Plant (6)', type1: 'grass', atk2: 'Sludge Bomb (7-)', type2: 'poison' },
    { name: 'Wigglytuff', atk1: 'Icy Wind (8-)', type1: 'ice', atk2: 'Swift (6)', type2: 'normal' },
    { name: 'Starmie', atk1: 'Surf  (12-)', type1: 'water', atk2: 'Power gem (13-)', type2: 'rock' },
  ];

  selectedPokemon: any;
  selectedAttackPattern: string = '';
  userAnswer: string = '';  // Cambiado a string
  resultMessage: string = '';

  constructor() {
    this.newRound();
  }

  newRound(): void {
    const randomIndex = Math.floor(Math.random() * this.pokemon.length);
    this.selectedPokemon = this.pokemon[randomIndex];
    const attackKey = Math.random() < 0.5 ? 'atk1' : 'atk2';
    this.selectedAttackPattern = this.selectedPokemon[attackKey];
    this.resultMessage = '';
    this.userAnswer = ''; // Reset user input
  }

  calculateAttacks(pattern: string): number {
    const match = pattern.match(/\((\d+)([\-*])?\)/);
    if (!match) return 0;

    let [_, baseNumberStr, patternSymbol] = match;
    let baseNumber = parseInt(baseNumberStr, 10);

    if (patternSymbol === '-') {
      // Patrón decreciente
      return this.calculateDecreasingPattern(baseNumber);
    } else if (patternSymbol === '*') {
      // Patrón alternante
      return this.calculateAlternatingPattern(baseNumber);
    } else {
      // Patrón simple
      return baseNumber;
    }
  }

  calculateDecreasingPattern(baseNumber: number): number {
    let numberOfAttacks = 0;
    let currentNumber = baseNumber;
    while (currentNumber > 0) {
      numberOfAttacks++;
      currentNumber--;
    }
    return numberOfAttacks;
  }

  calculateAlternatingPattern(baseNumber: number): number {
    // Ejemplo simplificado para patrón alternante
    return baseNumber * 2; // Ajustar según las reglas específicas del patrón alternante
  }
  getAttackType(pattern: string): string {
    // Devuelve el tipo correspondiente basándote en el patrón
    const attackName = this.getAttackName(pattern);
    return this.selectedPokemon?.atk1.includes(attackName)
      ? this.selectedPokemon.type1
      : this.selectedPokemon?.type2 || '';
  }

  getAttackName(pattern: string): string {
    // Extrae solo el nombre del ataque
    return pattern.split(' (')[0].trim();
  }

  checkAnswer(): void {
    if (!this.userAnswer) {
      this.resultMessage = 'Please enter your answer.';
      return;
    }

    // El patrón correcto se mantiene completo
    const correctPattern = this.selectedAttackPattern.match(/\((\d+[\-*]?)\)/)?.[1] || '';

    if (this.userAnswer === correctPattern) {
      this.resultMessage = 'Correct! Well done.';
    } else {
      const correctAnswer = this.calculateAttacks(this.selectedAttackPattern);
      this.resultMessage = `Incorrect. The correct answer was ${correctPattern}.`;
    }
  }
}
