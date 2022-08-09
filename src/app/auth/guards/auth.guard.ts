import { Injectable } from '@angular/core';
import {
  Router,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanLoadAuthGuard implements CanLoad {
  constructor(private _authService: AuthService, private _router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this._authService.isAuthenticated$.pipe(
      map((s: boolean) =>
        !s
          ? route.path !== 'login'
            ? this._router.parseUrl('/')
            : true
          : route.path !== 'login'
          ? true
          : this._router.parseUrl('/floral')
      )
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class CanActivateAuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this._authService.isAuthenticated$.pipe(map((s: boolean) => s));
  }
}
