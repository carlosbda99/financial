import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap, throwError, throwIfEmpty } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../shared/domain/user';
import { isNotNullOrUndefined } from '../shared/utils';
import { FinancialApiService } from './financial-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends FinancialApiService {
  private auth$: Subject<void> = new Subject();
  private revoke$: Subject<void> = new Subject();
  private _token?: string | undefined | null;

  constructor(http: HttpClient) {
    super('users', http);
  }

  get onAuth(): Observable<void> {
    return this.auth$.asObservable();
  }

  get onRevoke(): Observable<void> {
    return this.revoke$.asObservable();
  }

  get token(): string | undefined {
    this._token = localStorage.getItem(environment.storage.tokenKey) as
      | string
      | undefined;

    return this._token;
  }

  get authorized(): boolean {
    return isNotNullOrUndefined(this.token);
  }

  auth(user: string, password: string): Observable<User[]> {
    // WARNING: This auth route is only for example purpose, use an secure auth route to login
    return this.get<User[]>('', {
      login: user,
      password,
    }).pipe(
      tap((users) => {
        if (users.length > 0) {
          this.setTokenStorage('token');
          this.setUserStorage(users[0]);
          this.auth$.next();
        } else throw new Error('User not authorized');
      }),
      throwIfEmpty(() => new Error('User not authorized'))
    );
  }

  revoke(): void {
    this.removeTokenStorage();
    this.removeUserStorage();
    this.revoke$.next();
  }

  newUser(user: User): Observable<void> {
    return this.post<User & { password: string }, void>('', {
      ...user,
      password: '123',
    });
  }

  private setTokenStorage(token: string): void {
    this._token = token;
    localStorage.setItem(environment.storage.tokenKey, this._token);
  }

  private setUserStorage(user: User): void {
    localStorage.setItem(environment.storage.userKey, JSON.stringify(user));
  }

  private removeTokenStorage(): void {
    this._token = null;
    localStorage.removeItem(environment.storage.tokenKey);
  }

  private removeUserStorage(): void {
    localStorage.removeItem(environment.storage.userKey);
  }
}
