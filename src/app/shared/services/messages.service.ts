import { Injectable } from '@angular/core';
import { Color } from '@shared';

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
  constructor() {}
}
