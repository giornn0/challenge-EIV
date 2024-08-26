import { Injectable } from '@angular/core';
import { Color } from '@shared';
import { BehaviorSubject } from 'rxjs';

export type AppMessage = {
  color: Color;
  message: string;
  iconPath?: string;
  title?: string;
  timeout?: number;
};

@Injectable({
  providedIn: 'platform',
})
export class MessagesService {
  #messages = new BehaviorSubject<AppMessage[]>([]);

  get messages() {
    return this.#messages.asObservable();
  }
  constructor() {}

  push(message: AppMessage) {
    this.#messages.next([message, ...this.#messages.value]);
  }
}
