import { TestBed } from '@angular/core/testing';

import { CanLoadAuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services';
import { of } from 'rxjs';

describe('CanLoadAuthGuard', () => {
  let service: CanLoadAuthGuard;
  let authSpy = jasmine.createSpyObj<AuthService>([], {
    isAuthenticated$: of(false),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authSpy }],
    });
    service = TestBed.inject(CanLoadAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
