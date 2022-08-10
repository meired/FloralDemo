import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegister, UserInfo } from '../types';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService implements OnDestroy {
  private _authSub$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable().pipe(map((t) => !!t));
  }

  constructor(private _router: Router, private _http: HttpClient) {
    super();
  }

  public ngOnDestroy(): void {
    this._authSub$.next(null);
    this._authSub$.complete();
  }

  public register(user: UserRegister): Observable<UserInfo> {
    return this.handleRequest<UserInfo>(
      this._http.post(`${environment.authApi}/auth/register`, user),
      (_) => alert('User registered!')
    );
  }

  public login(user: UserLogin): Observable<UserInfo> {
    return this.handleRequest<UserInfo>(
      this._http.post(`${environment.authApi}/auth/login`, user),
      (user) => this._authSub$.next(<string>user.token)
    );
  }

  public logout(redirect: string): void {
    // Make your log out request
    // And then execute of successful
    this._authSub$.next(null);
    this._router.navigate([redirect]);
  }
}
