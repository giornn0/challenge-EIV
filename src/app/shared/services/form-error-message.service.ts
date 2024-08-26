import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormErrorMessageService {
  private customErrorMessages: { [key: string]: string } = {};

  setCustomErrorMessages(messages: { [key: string]: string }) {
    this.customErrorMessages = { ...this.customErrorMessages, ...messages };
  }

  getErrorMessage(key: string): string | null {
    return this.customErrorMessages[key] || null;
  }
}
