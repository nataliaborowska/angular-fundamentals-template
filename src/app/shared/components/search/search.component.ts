import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = '';
  @Output() search = new EventEmitter<string>();
  searchTerm: string = '';

  onSearchCourse() {
    if (this.searchTerm.trim() !== '') {
      this.search.emit(this.searchTerm)
    }
  }
}

