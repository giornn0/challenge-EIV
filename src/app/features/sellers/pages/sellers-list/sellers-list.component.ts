import { Component, inject } from '@angular/core';
import {
  getFormFromSeller,
  Seller,
  SellersApiService,
} from '@app-features/sellers';
import { AsyncPipe } from '@angular/common';
import {
  ContainerComponent,
  KeyOf,
  RecordSome,
  ToggleButtonComponent,
} from '@shared';
import { RouterLink } from '@angular/router';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-sellers-list',
  standalone: true,
  imports: [ContainerComponent, AsyncPipe, RouterLink, ToggleButtonComponent],
  templateUrl: './sellers-list.component.html',
  styleUrl: './sellers-list.component.scss',
})
export class SellersListComponent {
  tableInfo: RecordSome<Seller, string> = {
    id: 'Id',
    nombre: 'Nombre',
    usuarioLogin: 'Usuario',
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

  deleteSeller(seller: Seller) {
    this.service.delete(seller.id).subscribe(this.handlerDelete);
  }

  handlerDelete: PartialObserver<Seller[KeyOf<Seller>]> = {
    next: (_id) => {
      this.sellersList = this.service.getAll();
    },
  };
  handlerUpdate: PartialObserver<Seller> = {
    next: (_seller) => {
      this.sellersList = this.service.getAll();
    },
  };
  setEdit(seller: Seller) {
    this.service.editSeller(seller);
  }

  changeStatus(seller: Seller, newStatus: boolean) {
    const form = getFormFromSeller(seller);
    form.habilitado = newStatus;
    this.service.update(form, seller.id).subscribe(this.handlerUpdate);
  }
}
