import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  #spinning = new BehaviorSubject(0);
  spin() {
    this.#spinning.next(this.#spinning.value + 1);
  }
  unspin() {
    this.#spinning.next(this.#spinning.value - 1);
  }
  get $spinner() {
    return this.#spinning.asObservable().pipe(map((s) => s > 0));
  }
  constructor() {}
}
