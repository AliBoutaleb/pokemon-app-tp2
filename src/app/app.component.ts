import {Component, OnInit} from '@angular/core';
import {Pokemon} from './pokemon/Pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Pokemon Arena';
  private pokemons: Pokemon[];
  log: string[];

  constructor() {
    this.pokemons = [];
    this.log = [];
  }

  ngOnInit(): void {
    this.pokemons.push(new Pokemon('Pikachu', 'http://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png', 5, 10, 2));
    this.pokemons.push(new Pokemon('Salameche', 'http://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png', 3, 10, 2));
  }

  updateLog(message: string): void {
    this.log.push(message);

    if (this.log.length > 5 ) {
      this.log.shift();
    }
  }

  launch_fight(): void {
    this.fight(this.pokemons[0], this.pokemons[1]);
  }

  reset_life(): void {
    this.pokemons.forEach((pokemon) => {
      pokemon.life = 10;
    });
    this.log = [];
  }

  isSuccess(): boolean {
    return Math.random() > 0.5;
  }

  getFaster(first: Pokemon, second: Pokemon): Pokemon {
    return first.speed > second.speed ? first : second;
  }

  attack(first: Pokemon, second: Pokemon): number {
    this.updateLog(`${first.name} attack ${second.name}`);
    if (this.isSuccess()) {
      second.life = (second.life - first.damage);
      this.updateLog(`Attack is successful - ${second.name} has ${second.life} life points left \n`);
    } else {
      this.updateLog(`Attack failed ! \n`);
    }
    return second.life;
  }

  fight(first: Pokemon, second: Pokemon): void {

    // Get the pokemon who will attack first
    let currentPokemon = this.getFaster(first, second);
    let waitingPokemon = currentPokemon === first ? second : first;
    let tempPokemon;

    // Print the first pokemon
    this.updateLog(`${currentPokemon.name} is faster than ${waitingPokemon.name}, he will attack first \n`);

    // Run the fight
    while (first.life > 0 && second.life > 0) {
      this.attack(currentPokemon, waitingPokemon);

      // Switch pokemon
      tempPokemon = currentPokemon;
      currentPokemon = waitingPokemon;
      waitingPokemon = tempPokemon;
    }

    // Print the winner
    const winner = first.life > 0 ? first : second;
    this.updateLog(`${winner.name} is the winner`);
  }
}
