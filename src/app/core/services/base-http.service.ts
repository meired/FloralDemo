import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ErrorHandler } from '../helpers';

@Injectable()
export class BaseHttpService {
  protected handler: ErrorHandler = new ErrorHandler();

  protected handleRequest<T>(
    request: Observable<Object>,
    next: (result: T) => void
  ): Observable<T> {
    return request.pipe(
      map((r) => r as T),
      tap({
        next: next,
        error: (err) => this.handler.handle(err),
      })
    );
  }
}
