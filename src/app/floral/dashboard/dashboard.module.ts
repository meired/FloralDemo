import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/ui-library';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
  declarations: [DashboardComponent],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardgModule {}
