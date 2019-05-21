import {Pokemon} from './Pokemon';
import {delay} from 'rxjs/operators';

export function isSuccess() {
    return Math.random() > 0.5;
}

export function getFaster(first: Pokemon, second: Pokemon) {
    return first.speed > second.speed ? first : second;
}

export function attack(first: Pokemon, second: Pokemon) {
    this.updateLog(`${first.name} attack ${second.name}`);
    if (isSuccess()) {
        second.life = (second.life - first.damage);
        this.updateLog(`Attack is successful - ${second.name} has ${second.life} life points left \n`);
    } else {
      this.updateLog(`Attack failed ! \n`);
    }
    return second.life;
}

export function fight(first: Pokemon, second: Pokemon) {

    // Get the pokemon who will attack first
    let currentPokemon = getFaster(first, second);
    let waitingPokemon = currentPokemon === first ? second : first;
    let tempPokemon;

    // Print the first pokemon
    this.updateLog(`${currentPokemon.name} is faster than ${waitingPokemon.name}, he will attack first \n`);

    // Run the fight
    while (first.life > 0 && second.life > 0) {
        attack(currentPokemon, waitingPokemon);

        // Switch pokemon
        tempPokemon = currentPokemon;
        currentPokemon = waitingPokemon;
        waitingPokemon = tempPokemon;
    }

    // Print the winner
    const winner = first.life > 0 ? first : second;
    this.updateLog(`${winner.name} is the winner`);
}

