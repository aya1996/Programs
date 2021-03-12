import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

const modules = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class NgMaterialModule {}
