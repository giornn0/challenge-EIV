import { Injectable } from '@angular/core';
import { ApiService } from '@shared';
import { Location } from '@app-features/locations';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService extends ApiService<Location> {
  constructor() {
    super('localidades');
  }
}
