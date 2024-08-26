import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Color, MessagesService } from '@shared';
import { catchError, Observable, of } from 'rxjs';

const getErrorMessage = (statusCode: HttpStatusCode) => {
  switch (statusCode) {
    case HttpStatusCode.BadRequest:
      return '¡Revise los datos!';
    case HttpStatusCode.Unauthorized:
      return 'Sin autorización.';
    case HttpStatusCode.Forbidden:
      return 'Sin permiso.';
    case HttpStatusCode.NotFound:
      return 'No se ha encontrado.';
    case HttpStatusCode.MethodNotAllowed:
      return 'Método no permitido.';
    case HttpStatusCode.NotAcceptable:
      return 'Los argumentos no se permiten.';
    case HttpStatusCode.InternalServerError:
      return 'Ha ocurrido un error.';
    case HttpStatusCode.NotImplemented:
      return 'Sin implementar.';
    case HttpStatusCode.ServiceUnavailable:
      return 'Servicio sin disponibilidad.';
  }
  return null;
};

export function errorResponseInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const messageService = inject(MessagesService);
  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        const msg = getErrorMessage(err.status);
        if (msg) {
          messageService.push({
            message: msg,
            color: Color.Danger,
          });
        }
      }
      return of(err);
    }),
  );
}
