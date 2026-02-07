import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-sidebar-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: `./search.html`,
  styleUrls: ['./search.scss'],
})
export class SearchComponent {
  @Input() config: any = {};
  @Input() searchText = '';
  @Output() searchChanged = new EventEmitter<string>();

  onSearch(value: string) {
    this.searchText = value;
    this.searchChanged.emit(value);
  }
}
