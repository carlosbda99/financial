import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap, throwIfEmpty } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../shared/domain/user';
import { Profile } from '../shared/enums/profile';
import { isNotNullOrUndefined } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private auth$: Subject<void> = new Subject();
  private revoke$: Subject<void> = new Subject();
  private _token?: string | undefined;
  
  constructor() { }

  get onAuth(): Observable<void> {
    return this.auth$.asObservable();
  }
  
  get onRevoke(): Observable<void> {
    return this.revoke$.asObservable();
  }
  
  get token(): string | undefined {
    this._token = localStorage.getItem(environment.storage.tokenKey) as string | undefined;

    return this._token;
  }

  get authorized(): boolean {
    return isNotNullOrUndefined(this._token);
  }

  auth(user: string, password: string): Observable<User> {
    if (user === 'admin' && password === 'admin'){
      const userFake: User = {
        email: 'admin@email.com',
        login: user,
        name: 'Admin',
        profiles: [Profile.ADMIN]
      };

      return of(userFake).pipe(
        tap(user => {
          this.setTokenStorage('token');
          this.setUserStorage(userFake);
          this.auth$.next();
        })
      );
    }

    if (user === 'user' && password === 'user'){
      const userFake: User = {
        email: 'guest@email.com',
        login: user,
        name: 'Guest',
        profiles: [Profile.COMMON]
      };

      return of(userFake).pipe(
        tap(user => {
          this.setTokenStorage('token');
          this.setUserStorage(userFake);
          this.auth$.next();
        })
      );
    }

    return of().pipe(
      throwIfEmpty(() => new Error('User not authorized'))
    );
  }

  private setTokenStorage(token: string): void {
    this._token = token;
    localStorage.setItem(environment.storage.tokenKey, this._token);
  }

  private setUserStorage(user: User): void {
    localStorage.setItem(environment.storage.userKey, JSON.stringify(user));
  }
}
