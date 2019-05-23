export class TextLog {
    name: string;
    picture: string;
    speed: number;
    life: number;
    damage: number;

    constructor(name: string, picture: string, speed: number, life: number, damage: number){
        this.name = name;
        this.picture = picture;
        this.speed = speed;
        this.life = life;
        this.damage = damage;
    }
}