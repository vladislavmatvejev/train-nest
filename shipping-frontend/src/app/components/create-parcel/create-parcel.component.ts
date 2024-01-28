import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parcel } from '../../models/parcel.model';
import { ParcelColumns } from '../../common/types';

@Component({
  selector: 'app-create-parcel',
  templateUrl: './create-parcel.component.html',
  styleUrl: './create-parcel.component.css'
})
export class CreateParcelComponent implements OnInit{
  @Input() parcelColumns: ParcelColumns = {};
  @Output() addParcel = new EventEmitter<Parcel>();

  parcel: any = {
    sku: '',
    description: '',
    streetAddress: '',
    town: '',
    country: '',
    deliveryDate: new Date(),
  };

  ngOnInit() {
    console.log('check123', this.parcelColumns);
    console.log('parcel', this.parcel);
  }

  onSubmit() {
    console.log(this.parcel);
    // this.addParcel.emit(this.parcel);
  }
}
