import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegister, UserInfo } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private _authSub$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable().pipe(map((t) => !!t));
  }

  constructor(private _router: Router, private _http: HttpClient) {}

  public ngOnDestroy(): void {
    this._authSub$.next(null);
    this._authSub$.complete();
  }

  public register(user: UserRegister): Observable<UserInfo> {
    return this._http
      .post('https://localhost:7120/api/auth/register', user)
      .pipe(
        map((r) => r as UserInfo),
        tap({
          next: (user) => alert('User registered!'),
          error: (error) => console.log('Tap Error', error),
        })
      );
  }

  public login(user: UserLogin): Observable<UserInfo> {
    return this._http.post('https://localhost:7120/api/auth/login', user).pipe(
      map((r) => r as UserInfo),
      tap({
        next: (user) => this._authSub$.next(<string>user.token),
        error: (error) => console.log('Tap Error', error),
      })
    );
  }

  public logout(redirect: string): void {
    // Make your log out request
    // And then execute of successful
    this._authSub$.next(null);
    this._router.navigate([redirect]);
  }
}
