import { Injectable } from '@angular/core';
import { Parcel } from '../models/parcel.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

type PaginatedResponse = {
  parcels: Parcel[],
  total: number
};

type ColumnsTerm = {
  country?: string,
  description?: string,
};

const baseUrl = 'http://localhost:3000/parcels';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  constructor(private http: HttpClient) { }

  getParcels(page: number, pageSize: number): Observable<PaginatedResponse> {
    const params = new HttpParams().set('page', page).set('limit', pageSize);
    return this.http.get<PaginatedResponse>(baseUrl, { params });
  }

  get(id: number): Observable<Parcel> {
    return this.http.get<Parcel>(`${baseUrl}/${id}`);
  }

  getBySku(sku: string): Observable<Parcel> {
    return this.http.get<Parcel>(`${baseUrl}/${sku}`);
  }

  create(parcel: Parcel): Observable<any> {
    return this.http.post(baseUrl, {parcel});
  }

  findByColumns(term: ColumnsTerm): Observable<PaginatedResponse> {
    // const params = new HttpParams().set('term', term);
    return this.http.get<PaginatedResponse>(`${baseUrl}?term=${term}`);
  }
}
