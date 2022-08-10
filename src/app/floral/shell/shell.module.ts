import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from 'src/app/auth';
import { ComponentsModule } from 'src/app/ui-library';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [CanActivateAuthGuard],
    children: [
      {
        path: 'orders',
        loadChildren: () => import('../orders').then((m) => m.OrdersModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../dashboard').then((m) => m.DashboardgModule),
      },
    ],
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
  declarations: [ShellComponent],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellModule {}
