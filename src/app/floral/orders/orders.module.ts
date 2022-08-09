import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/component-library';
import { OrderItemComponent } from './order-item';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
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
  declarations: [OrdersComponent, OrderItemComponent],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe, CurrencyPipe],
})
export class OrdersModule {}
