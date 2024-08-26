import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-message',
  standalone: true,
  imports: [],
  templateUrl: './form-error-message.component.html',
  styleUrl: './form-error-message.component.scss',
})
export class FormErrorMessageComponent {
  @Input() control?: AbstractControl;
  @Input() errorMessages: { [key: string]: string } = {};

  private defaultErrorMessages: { [key: string]: string } = {
    required: 'Este campo es requerido.',
    minlength: 'Este campo es muy corto.',
    maxlength: 'Este campo es demasiado largo.',
    email: 'Por favor, ingrese un mail válido.',
    pattern: 'Por favor, ingrese un valor válido.',
    dateOutOfRange: 'Fecha fuera del rango permitido.',
  };

  getErrors(): string[] {
    if (!this.control || !this.control.errors) return [];

    return Object.keys(this.control.errors).map(
      (key) =>
        this.errorMessages[key] ||
        this.defaultErrorMessages[key] ||
        `Error: ${key}`,
    );
  }
}
