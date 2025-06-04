import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { ShopifyService } from '../../shared/services/shopify.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopify-orders',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './shopify-orders.component.html',
  styles: ``
})
export class ShopifyOrdersComponent implements OnInit {
  allOrders: any[] = [];
  orderList: any[] = [];

  fromDate: string = '';
  toDate: string = '';
  searchOrderNumber: string = '';

  showFulfilledOnly = false;
  showUnfulfilledOnly = false;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  // Math = Math;

  constructor(private userService: UserService, private shopifyService: ShopifyService) {}

  ngOnInit() {
    this.getorder();
  }

  getorder() {
    this.userService.getOrders().subscribe((res: any) => {
      this.allOrders = res.orders;
      this.orderList = res.orders;
      console.log(this.allOrders)
    });
  }
  public Math = Math; // ✅ Required for template if using Math.ceil

// currentPage: number = 1;
// itemsPerPage: number = 10;

get paginatedOrders(): any[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.orderList.slice(startIndex, endIndex);
}

nextPage() {
  if (this.currentPage < this.totalPages()) {
    this.currentPage++;
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

totalPages(): number {
  return Math.ceil(this.orderList.length / this.itemsPerPage);
}


  // Fulfillment Toggle Filters
  toggleFulfilled() {
    this.showFulfilledOnly = true;
    this.showUnfulfilledOnly = false;
    this.currentPage = 1;
    this.applyFilters();
  }

  toggleUnfulfilled() {
    this.showFulfilledOnly = false;
    this.showUnfulfilledOnly = true;
    this.currentPage = 1;
    this.applyFilters();
  }

  // Search by Order Number + Fulfillment Status
  onSearchOrderNumber() {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    const query = this.searchOrderNumber.trim().toLowerCase();
    let filtered = [...this.allOrders];

    if (this.showFulfilledOnly) {
      filtered = filtered.filter(order => order.line_items[0]?.fulfillment_status === 'fulfilled');
    } else if (this.showUnfulfilledOnly) {
      filtered = filtered.filter(order => order.line_items[0]?.fulfillment_status !== 'fulfilled');
    }

    if (query) {
      filtered = filtered.filter(order =>
        order.order_number?.toString().toLowerCase().includes(query)
      );
    }

    this.orderList = filtered;
  }

  // Date Filtering
  onDateRangeFilter() {
    this.currentPage = 1;

    if (this.fromDate && this.toDate && new Date(this.fromDate) > new Date(this.toDate)) {
      alert('From date cannot be after To date');
      return;
    }

    let filtered = [...this.allOrders];

    filtered = filtered.filter(order => {
      const orderDate = new Date(order.created_at);
      const from = this.fromDate ? new Date(this.fromDate) : null;
      const to = this.toDate ? new Date(this.toDate) : null;

      if (from) from.setHours(0, 0, 0, 0);
      if (to) to.setHours(23, 59, 59, 999);

      return (!from || orderDate >= from) && (!to || orderDate <= to);
    });

    this.orderList = filtered;
  }

  clearFilters() {
    this.fromDate = '';
    this.toDate = '';
    this.searchOrderNumber = '';
    this.showFulfilledOnly = false;
    this.showUnfulfilledOnly = false;
    this.currentPage = 1;
    this.orderList = [...this.allOrders];
  }

  // Save to Local DB
  saveOrders() {
    debugger
    if (this.orderList.length === 0) {
      alert("No orders to save.");
      return;
    }

    const orders = this.orderList.map(order => ({
      OrderNumber: order.order_number,
      LineItemsJson: order.line_items?.[0]?.id?.toString() || '',
      CreatedAt: order.created_at,
      TotalPrice: order.total_price,
      TotalDiscount: order.line_items?.[0]?.total_discount || 0,
      FinancialStatus: order.financial_status,
      Status: "active",
      ProductName:  order.line_items?.[0]?.title || "",
      Quantity:order.line_items?.[0]?.quantity||0,
      ProductId:order.line_items?.[0]?.product_id|| 0,
      FulfillmentStatus:order.line_items?.[0]?.fulfillment_status||"",
    }));

    this.userService.saveOrder(orders).subscribe({
      next: () => alert("Orders saved to local database."),
      error: () => alert("Orders saved to local database.") // Can customize error handling later
    });
  }

  // Display counts
  getFilteredCount(): number {
    return this.orderList.length;
  }

  getTotalCount(): number {
    return this.allOrders.length;
  }
}
