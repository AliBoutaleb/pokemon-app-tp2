export class PokemonFight {
    attacker: string;
    defendant: string;
    round: number;

    constructor(attacker: string, defendant: string, round: number){
        this.attacker = attacker;
        this.defendant = defendant;
        this.round = round;
    }
}
