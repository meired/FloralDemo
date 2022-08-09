import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoginValid = true;
  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef
  ) {
    this.returnUrl =
      this._route.snapshot.queryParams['returnUrl'] || '/picaflor';

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public ngOnInit(): void {
    this._authService.isAuthenticated$
      .pipe(
        filter((isAuthenticated: boolean) => isAuthenticated),
        takeUntil(this._destroySub$)
      )
      .subscribe((_) => this._router.navigateByUrl(this.returnUrl));
  }

  public get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  public get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public register(): void {
    this._authService
      .register({
        fullName: 'Jeimy Rojas',
        userName: 'jrojas',
        password: 'someweirdpassword',
      })
      .subscribe();
  }

  public onSubmit(): void {
    this.isLoginValid = true;

    this._authService
      .login({
        userName: this.username.value,
        password: this.password.value,
      })
      .pipe(take(1))
      .subscribe({
        next: (_) => {
          this.isLoginValid = true;
          this._router.navigateByUrl('/picaflor');
        },
        error: (_) => {
          this.isLoginValid = false;
          this._cdr.markForCheck();
        },
      });
  }
}
