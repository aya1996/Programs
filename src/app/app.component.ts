import { Component } from '@angular/core';
import { Program } from './models/program';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Programs';
  searchWord: string;
  programs: Program[];

  getSearchWord(word: string) {
    this.searchWord = word;
  }

  getMultipleFiltered(programs: Program[]) {
    // console.log('in app', programs);
    this.programs = programs;
  }
}
