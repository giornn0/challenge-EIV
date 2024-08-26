import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import {
  ValidEnvironments,
  KeyOf,
  Nullable,
  ValidHttpHeader,
  workingEnvironment,
} from '@shared';
import { map, Observable } from 'rxjs';

export interface IApiService<T, F = void> {
  getAll(): Observable<T[]>;
  getOne(id: T[KeyOf<T>]): Observable<T>;
  create(data: T | F): Observable<T>;
  update(data: T | F, id: T[KeyOf<T>]): Observable<T>;
  delete(id: T[KeyOf<T>]): Observable<Nullable<T[KeyOf<T>]>>;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService<T, F = void> implements IApiService<T, F> {
  http = inject(HttpClient);

  jsonHeader;
  fileHeader;

  apiEndpoint: string;
  baseUrl: string;

  getApiEndpoint: Record<ValidEnvironments, string> = {
    [ValidEnvironments.Dev]: 'http://localhost:8080/api',
    [ValidEnvironments.Testing]: 'http://localhost:8080/api',
    [ValidEnvironments.Production]: 'http://localhost:8080/api',
  };

  constructor(@Inject('resourceBaseUrl') resourceBaseUrl: string) {
    const workingEnv = workingEnvironment();
    this.apiEndpoint = this.getApiEndpoint[workingEnv];
    this.baseUrl = `${this.apiEndpoint}/${resourceBaseUrl}`;
    this.jsonHeader = new HttpHeaders().append(
      ValidHttpHeader.ContentType,
      'application/json',
    );
    this.fileHeader = new HttpHeaders()
      .append(ValidHttpHeader.ContentType, 'multipart/form-data;')
      .append(ValidHttpHeader.Accept, '*/*');
  }
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }
  getOne(id: T[KeyOf<T>]): Observable<T> {
    return this.http.get<T>(this.urlWith(id));
  }
  create(data: T | F): Observable<T> {
    return this.http.post<T>(this.baseUrl, data, { headers: this.jsonHeader });
  }
  update(data: T | F, id: T[KeyOf<T>]): Observable<T> {
    return this.http.put<T>(this.urlWith(id), data, {
      headers: this.jsonHeader,
    });
  }
  delete(id: T[keyof T]): Observable<T[KeyOf<T>]> {
    return this.http.delete(this.urlWith(id)).pipe(map((_r) => id));
  }

  urlWith(...params: Array<string | T[KeyOf<T>]>): string {
    return this.baseUrl + `/${params.join('/')}`;
  }
}
