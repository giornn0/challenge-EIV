import { HttpInterceptorFn } from '@angular/common/http';
import { errorResponseInterceptor } from './core/interceptors/error-response.interceptor';
import { spinnerLoaderInterceptor } from './core/interceptors/spinner-loader.interceptor';

export const interceptors: HttpInterceptorFn[] = [
  errorResponseInterceptor,
  spinnerLoaderInterceptor,
];
