import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Parcel } from '../../models/parcel.model';
import { ParcelColumns } from '../../common/types';
import { CommonModule } from '@angular/common';
import { ParcelService } from '../../services/parcel.service';

@Component({
  selector: 'app-create-parcel',
  templateUrl: './create-parcel.component.html',
  styleUrl: './create-parcel.component.css',
})
export class CreateParcelComponent implements OnInit{
  @Input() parcelColumns: ParcelColumns = {};
  @Input() parcel: any = {
    sku: '',
    description: '',
    streetAddress: '',
    town: '',
    country: '',
    deliveryDate: new Date(),
  };

  constructor(private parcelService: ParcelService) {}

  ngOnInit() {
    console.log('check123', this.parcelColumns);
    console.log('parcel', this.parcel);
  }

  onSubmit(formData: NgForm) {
    console.log(this.parcel);
    this.parcelService.create(this.parcel).subscribe(
      res => {
        console.log('added +', res);
      },
      error => {
        if (error.status === 409 && error.statusText === 'Conflict') {
          formData.form.controls['sku'].setErrors({
            invalid: 'parcel with this SKU already exists',
          })
        }

        const isBadRequest = error.status === 400;
        const errorMessage: string[] = error?.error.message;
        console.log('errorMessageIsArr', errorMessage);

        if (isBadRequest && errorMessage.length > 0) {
          errorMessage.forEach(em => {
            const fieldName = em.split(' ')[0];
            formData.form.controls[fieldName].setErrors({
              invalid: em,
            })
          })
        }
      },
    );
  }
}
