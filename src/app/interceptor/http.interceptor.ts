import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
        return throwError(this.handleError(err));
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errMessage = '';
    if(error.error instanceof ErrorEvent) {
      //client side error handling
      // this._alert.error(error.error.message);
      errMessage = `Error: ${error.error.message}`;
    } else {
      //server side error
      if(error.status == 401) {
        // this._alert.error(error.message);
      }
      errMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    return errMessage;
  }
}
