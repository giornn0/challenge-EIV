import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Color } from 'app/shared/models';
import { IdAppMessage, MessagesService } from 'app/shared/services';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  messagesService = inject(MessagesService);
  $messages = this.messagesService.messages;

  color = Color;

  closeMsg(message: IdAppMessage) {
    this.messagesService.closeMessage(message);
  }
}
