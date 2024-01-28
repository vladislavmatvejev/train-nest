import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrl: './parcel-details.component.css'
})
export class ParcelDetailsComponent {
  @Input() selectedParcel: any;
}
