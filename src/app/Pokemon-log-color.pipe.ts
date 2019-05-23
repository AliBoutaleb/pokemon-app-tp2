import { Pipe, PipeTransform } from '@angular/core';
​
@Pipe({name: 'PokemonLogColor'})
export class PokemonLogColorPipe implements PipeTransform {
  transform(autor: string): string {
​
    let color: string;
​
    switch (autor) {
      case 'Pikachu':
        color = 'yellow lighten-1';
        break;
      case 'Salameche':
        color = 'orange lighten-1';
        break;
      case 'Death':
        color = 'red lighten-1';
        break;
      default:
        color = 'grey';
        break;
    }
​
    return 'color: ' + color;
​
  }
}