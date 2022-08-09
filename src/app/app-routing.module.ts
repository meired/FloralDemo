import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadAuthGuard } from './auth';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./floral/login').then((m) => m.LoginModule),
    canLoad: [CanLoadAuthGuard],
  },
  {
    path: 'floral',
    loadChildren: () => import('./floral/shell').then((m) => m.ShellModule),
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
