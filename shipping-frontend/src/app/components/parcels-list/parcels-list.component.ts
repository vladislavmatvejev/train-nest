import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Parcel } from '../../models/parcel.model';
import { ParcelService } from '../../services/parcel.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-parcels-list',
  templateUrl: './parcels-list.component.html',
  styleUrl: './parcels-list.component.css'
})
export class ParcelsListComponent {
  @Input() parcels!: Parcel[];
  currentParcel: Parcel = {};
  currentIndex = -1;

  @Output() page = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private parcelService: ParcelService) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.pageSize = 5; // Adjust the number of items per page as needed
    }
  }

  onPageChange(event: any) {
    this.page.emit(event);
  }

  // retrievableParcels(): void {
  //   this.parcelService.getAll()
  //     .subscribe({
  //       next: (data) => {
  //         // this.parcels = data.parcels;
  //         this.parcels = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e),
  //     })
  // }

  refreshList(): void {
    // this.retrievableParcels();
    this.currentParcel = {};
    this.currentIndex = -1;
  }

  setActiveParcel(parcel: Parcel, idx: number): void {
    this.currentParcel = parcel;
    this.currentIndex = idx;
  }

  filterByColumns(): void {
    this.currentParcel = {};
    this.currentIndex = -1;

    // this.parcelService.findByColumns
  }
}
