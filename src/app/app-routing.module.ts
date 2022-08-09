import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadAuthGuard } from './auth';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./picaflor/login').then((m) => m.LoginModule),
    canLoad: [CanLoadAuthGuard],
  },
  {
    path: 'picaflor',
    loadChildren: () => import('./picaflor/shell').then((m) => m.ShellModule),
    canLoad: [CanLoadAuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**/**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
