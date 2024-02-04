// @ts-nocheck
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Parcel } from '../../models/parcel.model';
import { ParcelColumns } from '../../common/types';
import { CreateParcelComponent } from '../create-parcel/create-parcel.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export class ModalComponent {
  isDetailView: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: {parcel: Parcel, parcelColumns: ParcelColumns, isDetailView: boolean}
  ) {
    this.isDetailView = modalData.isDetailView;
  }

  onSubmit() {
    // Handle form submission
    this.dialogRef.close(this.modalData.parcel);
  }

  cancel() {
    this.dialogRef.close();
  }
}
