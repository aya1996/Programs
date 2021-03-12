import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { ProgramsService } from 'src/app/services/programs.service';
import { Program } from 'src/app/models/program';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() cityWord = '';
  @Input() filteredPrograms: Program[] = [];

  programs: Program[];
  constructor(private programsService: ProgramsService) {}

  ngOnInit(): void {
    this.programs = this.programsService.getPrograms();
    // this.programsService.getPrice();
  }
  ngOnChanges() {
    if (this.cityWord) {
      this.programs = this.programsService.filterProgramByCity(
        'city',
        this.cityWord
      );
      this.cityWord = '';
      console.log(this.programs);
      return;
    }
    if (
      this.cityWord === '' ||
      this.cityWord === null ||
      this.filteredPrograms
    ) {
      this.programs = this.filteredPrograms;
      this.filteredPrograms = [];
      return;
    }
  }
}
