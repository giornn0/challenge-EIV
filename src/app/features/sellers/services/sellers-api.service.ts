import { DestroyRef, Inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Seller, SellerForm } from '@app-features/sellers';
import { ApiService, Nullable, ValidHttpHeader } from '@shared';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellersApiService extends ApiService<Seller, SellerForm> {
  #keyForEdition = 'sellerForEdition';
  #sellerForEdition = new BehaviorSubject<Nullable<Seller>>(
    JSON.parse(localStorage.getItem(this.#keyForEdition) ?? 'null'),
  );
  get sellerForEdit() {
    return this.#sellerForEdition.value;
  }
  constructor(@Inject(DestroyRef) private destroyRef: DestroyRef) {
    super('vendedores');
    this.#sellerForEdition
      .asObservable()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) =>
        localStorage.setItem(this.#keyForEdition, JSON.stringify(value)),
      );
  }
  getPhoto(id: number): Observable<File | null> {
    return this.http
      .get<File>(this.urlWith(id, 'foto'), {
        headers: {
          [ValidHttpHeader.Accept]: 'application/octet-stream',
        },
        responseType: 'blob' as 'json',
      })
      .pipe(
        map((blob) => {
          if (blob.size) {
            return new File([blob], `foto-${id}`);
          }
          return null;
        }),
      );
  }
  updatePhoto(id: number, photoFile: File): Observable<boolean> {
    const formData = new FormData();
    formData.set('file', photoFile);
    return this.http
      .post(this.urlWith(id, 'foto'), formData)
      .pipe(map((_r) => true));
  }

  editSeller(seller: Seller) {
    this.#sellerForEdition.next(seller);
  }
  clearEdition() {
    this.#sellerForEdition.next(null);
  }
}
