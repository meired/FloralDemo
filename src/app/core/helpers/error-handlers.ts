import { HttpErrorResponse } from '@angular/common/http';

export enum ErrorType {
  NOT_FOUND = 404,
  INVALID_DATA = 400,
}

export class ErrorHandler {
  /**
   *
   */
  public handle(error: HttpErrorResponse): any {
    var returnedError = null;
    switch (error.status) {
      case ErrorType.NOT_FOUND:
      case ErrorType.INVALID_DATA:
        this.onKnownError(error?.error);
        break;
      default:
        returnedError = error;
        break;
    }
    return returnedError;
  }

  private onKnownError(msg: string | null): void {
    alert(msg ?? 'We are unable to proccess the request.');
  }
}
