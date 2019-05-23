import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import {PokemonLogColorPipe} from './pokemon-log-color.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonLogColorPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
