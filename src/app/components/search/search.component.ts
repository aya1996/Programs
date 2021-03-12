import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ProgramsService } from 'src/app/services/programs.service';
import { Program } from 'src/app/models/program';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() searchKey = new EventEmitter<string>();

  cityControl = new FormControl();
  courseControl = new FormControl();

  options: string[] = this.programsService.getCities();
  filteredOptions: Observable<string[]>;

  constructor(private programsService: ProgramsService) {}

  ngOnInit() {
    this.filteredOptions = this.cityControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  onSearch() {
    this.searchKey.emit(this.cityControl.value);
    this.cityControl.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
