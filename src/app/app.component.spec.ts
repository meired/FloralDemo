import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AuthService } from './auth';

describe('AppComponent', () => {
  const authSpy = jasmine.createSpyObj<AuthService>([], {
    isAuthenticated$: of(false),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        BrowserTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [{ provide: AuthService, useValue: authSpy }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
