import { Injectable } from '@angular/core';
import { Seller, SellerForm } from '@app-features/sellers';
import { ApiService, KeyOf } from '@shared';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellersApiService extends ApiService<Seller, SellerForm> {
  constructor() {
    super('vendedores');
  }
  getPhoto(id: KeyOf<Seller>): Observable<string> {
    return this.http.get<string>(this.urlWith(id, 'foto'));
  }
  updatePhoto(id: KeyOf<Seller>, photo: string): Observable<boolean> {
    return this.http
      .post(this.urlWith(id, 'foto'), { photo }, { headers: this.fileHeader })
      .pipe(map((r) => !!r));
  }
}
