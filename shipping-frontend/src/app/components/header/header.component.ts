import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() filterByCountry = new EventEmitter<string>();
  @Output() filterByDescription = new EventEmitter<string>();

  selectedCountry: string = '';
  descriptionFilter: string = '';
  countryList: string[] = ['Estonia', 'Other'];

  applyCountryFilter() {
    this.filterByCountry.emit(this.selectedCountry);
  }

  applyDescriptionFilter() {
    this.filterByDescription.emit(this.descriptionFilter);
  }
}
