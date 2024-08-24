import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Environments, KeyOf, ValidHttpHeader, getEnvironment } from '@shared';
import { map, Observable } from 'rxjs';

export interface IApiService<T, F = void> {
  getAll(): Observable<T[]>;
  getOne(id: KeyOf<T>): Observable<T>;
  create(data: T | F): Observable<boolean>;
  update(data: T | F, id: KeyOf<T>): Observable<boolean>;
}

const getApiEndpoint: Record<Environments, string> = {
  [Environments.Dev]: 'http://localhost:8080/api',
  [Environments.Testing]: 'http://localhost:8080/api',
  [Environments.Production]: 'http://localhost:8080/api',
};

@Injectable({
  providedIn: 'root',
})
export class ApiService<T, F = void> implements IApiService<T, F> {
  http = inject(HttpClient);

  jsonHeader;
  fileHeader;

  apiEndpoint = getApiEndpoint[getEnvironment()];
  baseUrl: string;
  constructor(@Inject('resourceBaseUrl') resourceBaseUrl: string) {
    this.baseUrl = `${this.apiEndpoint}/${resourceBaseUrl}`;
    this.jsonHeader = new HttpHeaders().append(
      ValidHttpHeader.ContentType,
      'application/json',
    );
    this.fileHeader = new HttpHeaders().append(
      ValidHttpHeader.ContentType,
      'application/octet-stream',
    );
  }
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }
  getOne(id: KeyOf<T>): Observable<T> {
    return this.http.get<T>(this.urlWith(id));
  }
  create(data: T | F): Observable<boolean> {
    return this.http
      .post<T>(this.baseUrl, data, { headers: this.jsonHeader })
      .pipe(map((r) => !!r));
  }
  update(data: T | F, id: KeyOf<T>): Observable<boolean> {
    return this.http
      .put<T>(this.urlWith(id), data, {
        headers: this.jsonHeader,
      })
      .pipe(map((r) => !!r));
  }

  urlWith(...params: Array<string | KeyOf<T>>): string {
    return this.baseUrl + `/${params.join('/')}`;
  }
}
