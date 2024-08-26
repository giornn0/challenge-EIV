import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Location } from '@app-features/locations/location.model';
import { LocationsApiService } from '@app-features/locations/services';
import { ContainerComponent, KeyOf, RecordSome } from '@shared';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [ContainerComponent, AsyncPipe],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss',
})
export class LocationsListComponent {
  tableInfo: RecordSome<Location, string> = {
    id: 'Id',
    localidad: 'Localidad',
    codigoPostal: 'Código postal',
  };
  headers: string[];
  columnAccesors: KeyOf<Location>[];

  service = inject(LocationsApiService);
  locationsList = this.service.getAll();

  constructor() {
    this.headers = Object.values(this.tableInfo);
    this.columnAccesors = <KeyOf<Location>[]>Object.keys(this.tableInfo);
  }
}
