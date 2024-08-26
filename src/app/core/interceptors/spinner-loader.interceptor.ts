import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '@shared';
import { delay, finalize } from 'rxjs';

export function spinnerLoaderInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const spinnerService = inject(SpinnerService);
  spinnerService.spin();
  // Clone the request to add the authentication header.
  return next(req).pipe(
    delay(150),
    finalize(() => spinnerService.unspin()),
  );
}
