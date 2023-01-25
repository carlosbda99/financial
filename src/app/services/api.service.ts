import { Injectable } from '@angular/core';
import { mergeMap, Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryParams } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {

  private readonly $baseURL: ReplaySubject<string> = new ReplaySubject(1);

  constructor(
    baseURL: string | Observable<string>,
    private http: HttpClient
  ) {
    if (typeof (baseURL) === 'string') {
      this.$baseURL.next(baseURL);
      this.$baseURL.complete();
      return;
    }

    baseURL
      .subscribe(
        {
          next: url => {
            this.$baseURL.next(url);
            this.$baseURL.complete();
          }
        }
      )
  }

  protected get baseURL(): Observable<string> {
    return this.$baseURL.asObservable();
  }

  protected get<R>(
    path: string,
    queryParams?: HttpParams | QueryParams
  ): Observable<R> {
    return this.baseURL.pipe(
      mergeMap(
        baseURL => this.http.get<R>(`${baseURL}/${path}`, {
          params: queryParams
        })
      )
    );
  }

  protected post<T, R>(
    path: string,
    data: T,
    queryParams?: HttpParams | QueryParams
  ): Observable<R> {
    return this.baseURL.pipe(
      mergeMap(
        baseURL => this.http.post<R>(`${baseURL}/${path}`, data, {
          params: queryParams
        })
      )
    );
  }

  protected put<T, R>(
    path: string,
    data: T,
    queryParams?: HttpParams | QueryParams
  ): Observable<R> {
    return this.baseURL.pipe(
      mergeMap(
        baseURL => this.http.put<R>(`${baseURL}/${path}`, data, {
          params: queryParams
        })
      )
    );
  }

  protected delete<R>(
    path: string,
    queryParams?: HttpParams | QueryParams
  ): Observable<R> {
    return this.baseURL.pipe(
      mergeMap(
        baseURL => this.http.delete<R>(`${baseURL}/${path}`, {
          params: queryParams
        })
      )
    );
  }
}
