import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../Pokemon';
import { disableDebugTools } from '@angular/platform-browser';
import { R3BoundTarget } from '@angular/compiler';
import { fight } from 'src/pokemons-utils';

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

  updateLog(autor: string,message: string): void {
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
    this.updateLog("first.name",`${first.name} attack ${second.name}`);
    if (this.isSuccess()) {
      second.life = (second.life - first.damage);
      this.updateLog("first.name",`Attack is successful - ${second.name} has ${second.life} life points left \n`);
    } else {
      this.updateLog("first.name",`Attack failed ! \n`);
    }
    return second.life;
  }

  attacker:Pokemon;
  defendant:Pokemon;
  stopFight = true;
  isFightFinish = false;

  fight(first: Pokemon, second: Pokemon): void {

    // Get the pokemon who will attack first
    if(!this.isFightFinish)
    {
      // Print the first pokemon
      this.attacker = this.getFaster(first, second);
      this.defendant = this.attacker === first ? second : first;
      this.updateLog("narrator",`${this.attacker.name} is faster than ${this.defendant.name}, he will attack first \n`);
    }
    let tempPokemon;


    // Run the fight
    /*var intervalAttack = setInterval(function (){
      if( currentPokemon.life <= 0 || waitingPokemon.life <= 0 ){
        clearInterval(intervalAttack);
      }
      this.attack(currentPokemon, waitingPokemon);
      
      // Switch pokemon
      tempPokemon = currentPokemon;
      currentPokemon = waitingPokemon;
      waitingPokemon = tempPokemon;
    },1000);*/

    const round = () => {
      this.attack(this.attacker, this.defendant);
      // Switch pokemon
      tempPokemon = this.attacker;
      this.attacker =  this.defendant;
      this.defendant = tempPokemon;
      if(this.attacker.life > 0 && this.stopFight != false){
        setTimeout(round, 1000);
      }
      if(this.attacker.life <=0  || this.defendant.life <=0 ){
        this.isFightFinish = true;
      }
    }
    
    round();

    // Print the winner
    if(this.isFightFinish)
    {
      
      debugger;
      const winner = first.life > 0 ? first : second;
      
      debugger;
      const looser = first.life > 0 ? second : first;
      this.updateLog("Death",`${looser.name} has fainted`);
      this.updateLog("narrator",`${winner.name} is the winner`);
    }
    
  }

  pause_combat(): void{
    if(!this.isFightFinish){
      if(this.stopFight){
          this.stopFight = false;
          this.fight(this.attacker,this.defendant);
      }else{
        this.stopFight = true;
        this.updateLog("narrator",`fight is stopped`);
      }
    }
  }
}
