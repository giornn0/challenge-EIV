import { Injectable } from '@angular/core';
import { Color, uuidv4 } from '@shared';
import { BehaviorSubject } from 'rxjs';

export type AppMessage = {
  color: Color;
  message: string;
  iconPath?: string;
  title?: string;
  timeout?: number;
};

export type IdAppMessage = { id: string } & AppMessage;

export const createIdAppMessage = (appMessage: AppMessage) => ({
  ...appMessage,
  id: uuidv4(),
});

@Injectable({
  providedIn: 'platform',
})
export class MessagesService {
  #messages = new BehaviorSubject<IdAppMessage[]>([]);

  get messages() {
    return this.#messages.asObservable();
  }
  constructor() {}

  push(message: AppMessage) {
    this.#messages.next([createIdAppMessage(message), ...this.#messages.value]);
  }
  closeMessage(message: IdAppMessage) {
    this.#messages.next(
      this.#messages.value.filter((msg) => msg.id !== message.id),
    );
  }
}
