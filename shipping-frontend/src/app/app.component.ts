import { Component, ViewChild } from '@angular/core';
import { ParcelService } from './services/parcel.service';
import { Parcel } from './models/parcel.model';
import { Event } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ParcelColumns } from './common/types';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataSource: MatTableDataSource<Parcel>;
  parcelColumns: ParcelColumns = {
    'sku': { type: 'text' },
    'description': { type: 'text' },
    'streetAddress': { type: 'text' },
    'town': { type: 'text' },
    'country': { type: 'text' },
    'deliveryDate': { type: 'date' },
  };
  tableColumns: string[] = Object.keys(this.parcelColumns);
  totalParcels: number = 0;
  selectedParcel: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private parcelService: ParcelService,
    private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource<Parcel>([]);
    this.loadParcels(1, 5);
  }

  loadParcels(page: number, pageSize: number) {
    this.parcelService.getParcels(page, pageSize).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data.parcels);
        this.totalParcels = data.total;
        this.dataSource.paginator = this.paginator;
        console.log('data' , data);
      }
    );
  }

  openParcelFormModal() {
    this.openModal(false, {});
  }
  openParcelDetailModal() {}

  addParcel(parcel: any) {
    this.parcelService.create(parcel);
  }

  onPageChange(event: any) {
    // Handle pagination changes
    this.loadParcels(event.pageIndex + 1, event.pageSize);
  }

  viewParcelDetails(event: Event) {
    // this.selectedParcel = this.parcelService.getBySku(sku);
    // Implement modal logic to display details
    console.log(event);
  }

  filterByCountry(country: string) {
    // Implement filtering logic by country
  }

  filterByDescription(description: string) {
    // Implement filtering logic by description
  }

  private openModal(isDetailView: boolean, parcel: Parcel) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        parcel,
        isDetailView,
        parcelColumns: this.parcelColumns,
      }
    });

    dialogRef.afterClosed().subscribe((result: Parcel) => {
      if (result) {
        console.log('result', result);
      }
    })
  }
}
