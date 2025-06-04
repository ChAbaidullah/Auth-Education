import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShopifyService } from '../../shared/services/shopify.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inactive-orders',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './inactive-orders.component.html',
  styles: ``
})
export class InactiveOrdersComponent implements OnInit {
  inactiveOrdersList: any[] = [];
  allOrders: any;
  orderList: any;

  constructor(private shopifyService: ShopifyService ,private userService: UserService) {}

  ngOnInit() {
    this.getorder()
  }
    getorder() {

    this.userService.  getinactive().subscribe((res: any) => {
      this.allOrders = res;
      this.orderList = res;
      console.log(this.allOrders)
  //  window.location.reload();
    });
  }
}
