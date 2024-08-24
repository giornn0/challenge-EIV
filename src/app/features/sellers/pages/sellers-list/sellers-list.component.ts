import { Component, inject } from '@angular/core';
import { Seller, SellersApiService } from '@app-features/sellers';
import { AsyncPipe } from '@angular/common';
import { ContainerComponent, KeyOf, RecordSome } from '@shared';

@Component({
  selector: 'app-sellers-list',
  standalone: true,
  imports: [ContainerComponent, AsyncPipe],
  templateUrl: './sellers-list.component.html',
  styleUrl: './sellers-list.component.scss',
})
export class SellersListComponent {
  tableInfo: RecordSome<Seller, string> = {
    id: 'Id',
    nombre: 'Nombre',
    habilitado: 'Estado',
  };
  headers: string[];
  columnAccesors: KeyOf<Seller>[];

  service = inject(SellersApiService);
  sellersList = this.service.getAll();

  constructor() {
    this.headers = Object.values(this.tableInfo);
    this.columnAccesors = <KeyOf<Seller>[]>Object.keys(this.tableInfo);
  }
}
