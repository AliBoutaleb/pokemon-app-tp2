import { Pipe, PipeTransform } from '@angular/core';
​
@Pipe({name: 'fightTextColor'})
export class PokemonTextColorPipe implements PipeTransform {
  transform(autor: string): string {
​
    let color: string;
​
    switch (autor) {
      case 'Pikachu':
        color = 'red lighten-1';
        break;
      case 'Salameche':
        color = 'blue lighten-1';
        break;
      case 'Death':
        color = 'green lighten-1';
        break;
      default:
        color = 'grey';
        break;
    }
​
    return 'chip ' + color;
​
  }
}