import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {
  private activeOrders: any[] = [];
  private inactiveOrders: any[] = [];

  // Subjects to hold and emit changes to orders lists
  private activeOrdersSubject = new BehaviorSubject<any[]>([]);
  private inactiveOrdersSubject = new BehaviorSubject<any[]>([]);

  constructor() {}

  // Call this after fetching real data from Shopify API to set active orders list
  setActiveOrders(orders: any[]) {
    this.activeOrders = orders;
    this.activeOrdersSubject.next(this.activeOrders);
  }

  // Observable for components to subscribe and get updated active orders
  getActiveOrders(): Observable<any[]> {
    return this.activeOrdersSubject.asObservable();
  }

  // Observable for components to subscribe and get updated inactive orders
  getInactiveOrders(): Observable<any[]> {
    return this.inactiveOrdersSubject.asObservable();
  }

  // Soft delete: move order from active to inactive list
  softDeleteOrder(order: any) {
    // Remove from active orders
    this.activeOrders = this.activeOrders.filter(o => o.id !== order.id);
    this.activeOrdersSubject.next(this.activeOrders);

    // Add to inactive orders
    this.inactiveOrders.push(order);
    this.inactiveOrdersSubject.next(this.inactiveOrders);
  }

}
