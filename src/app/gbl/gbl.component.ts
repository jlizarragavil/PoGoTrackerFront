import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-gbl',
  templateUrl: './gbl.component.html',
  styleUrls: ['./gbl.component.scss'],
  
})
export class GBLComponent {
  pokemon = this.getPokemon();
  pokemonTypes: string[] = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic',
    'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  constructor() {
    
  }
  @ViewChild('dt') dt: Table | undefined;
  filterTable(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && this.dt) {
      const value = inputElement.value;
      this.dt.filter(value, 'name', 'contains');
    }
  }
  getPokemon(): any[] {
    return [
      { name: 'Clodsire', atk1: 'Earthquake (8-) ', type1: 'ground', atk2: 'Stone Edge (7-)', type2: 'rock' },
      { name: 'Clodsire', atk1: 'Earthquake (8-) ', type1: 'ground', atk2: 'Slodge Bomb (6)', type2: 'poison' },
      { name: 'Corsola Galarian', atk1: 'Night Shade (5*) ', type1: 'ghost', atk2: 'Power gem (5)', type2: 'rock' },
      { name: 'Feraligatr', atk1: 'Hydro cannon (5)', type1: 'water', atk2: 'Ice Beam (7)', type2: 'ice' },
      { name: 'Gastrodon', atk1: 'Body Slam (4*)', type1: 'normal', atk2: 'Earth Power (6*)', type2: 'ground' },
      { name: 'Annihilape', atk1: 'Rage Fist (6)', type1: 'ghost', atk2: 'Close Combat (8*)', type2: 'fighting' },
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
  }

  getAttackClass(type: string): string {
    switch (type) {
      case 'normal': return 'type-normal';
      case 'fire': return 'type-fire';
      case 'water': return 'type-water';
      case 'electric': return 'type-electric';
      case 'grass': return 'type-grass';
      case 'ice': return 'type-ice';
      case 'fighting': return 'type-fighting';
      case 'poison': return 'type-poison';
      case 'ground': return 'type-ground';
      case 'flying': return 'type-flying';
      case 'psychic': return 'type-psychic';
      case 'bug': return 'type-bug';
      case 'rock': return 'type-rock';
      case 'ghost': return 'type-ghost';
      case 'dragon': return 'type-dragon';
      case 'dark': return 'type-dark';
      case 'steel': return 'type-steel';
      case 'fairy': return 'type-fairy';
      default: return '';
    }
  }
}
