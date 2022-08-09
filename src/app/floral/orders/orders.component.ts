import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { OrderItem } from './orders.types';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  public orders: OrderItem[] = [];

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getOrders();
    }, 3000);
  }

  public onItemDeleted(order: OrderItem): void {
    alert(`Order delete button clicked! Order #${order.id}`);
  }

  private getOrders(): void {
    this.orders = [
      {
        id: 1,
        date: new Date(2022, 5, 18),
        detail: [
          {
            id: 1,
            name: 'Item 1',
            cost: 120,
          },
          {
            id: 2,
            name: 'Item 2',
            cost: 435,
          },
          {
            id: 3,
            name: 'Item 3',
            cost: 213,
          },
        ],
      },
      {
        id: 2,
        date: new Date(2022, 1, 23),
        detail: [
          {
            id: 1,
            name: 'Item 1',
            cost: 120,
          },
          {
            id: 2,
            name: 'Item 2',
            cost: 435,
          },
          {
            id: 3,
            name: 'Item 3',
            cost: 213,
          },
        ],
      },
      {
        id: 3,
        date: new Date(2022, 3, 15),
        detail: [
          {
            id: 1,
            name: 'Item 1',
            cost: 120,
          },
          {
            id: 2,
            name: 'Item 2',
            cost: 435,
          },
          {
            id: 3,
            name: 'Item 3',
            cost: 213,
          },
        ],
      },
    ];
    this._cdr.markForCheck();
  }
}
