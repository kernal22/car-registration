import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  public _postCall(url: string, body: {}): Observable<any> {
    return this._http.post(url, body).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => throwError(err))
    );
  }

  public _getCall(url: string, params?: any): Observable<any> {
    return this._http.get(url, { params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => throwError(err))
    );
  }

  public _putCall(url: string, body: {}, params?: any): Observable<any> {
    return this._http.put(url, body, { params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => throwError(err))
    );
  }

  public _deleteCall(url: string, body?: {}, params?: any): Observable<any> {
    const httpOptions = {
      body: body,
      params: params,
    };
    return this._http.request("delete", url, httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => throwError(err))
    );
  }

  public _searchCall(url: string, body: {}): Observable<any> {
    return this._http.post(url, body).pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      map((res: any) => {
        return res;
      }),
      catchError((err) => throwError(err))
    );
  }
}
